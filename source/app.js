const fs = require('fs');
const http = require('http');
const https = require('https');
const mongoose = require('mongoose');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const {renderToStaticMarkup} = require('react-dom/server');

const Model = require('./models/model');

const getCardsController = require('./controllers/card/get-all');
const createCardController = require('./controllers/card/create');
const removeCardController = require('./controllers/card/remove');
const getTransactionsController = require('./controllers/transaction/get');
const getAllTransactionsController = require('./controllers/transaction/get-all');
const createTransactionController = require('./controllers/transaction/create');
const cardToPhoneController = require('./controllers/operations/card-to-phone');
const phoneToCardController = require('./controllers/operations/phone-to-card');
const cardToCardController = require('./controllers/operations/card-to-card');

mongoose.connect('mongodb://localhost/app', {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

const app = new Koa();
const router = new Router();

const logger = require('../libs/logger.js')('wallet-app');

router.param('id', (id, ctx, next) => {
  return next();
});

const indexView = require('./views/index.server.js');

router.get('/', async (ctx) => {
  const cards = await ctx.Model.getAllCards();
  const indexViewHtml = renderToStaticMarkup(indexView(cards));
  ctx.body = indexViewHtml;
});

router.get('/cards/', getCardsController);
router.post('/cards/', createCardController);
router.delete('/cards/:id/', removeCardController);
router.get('/cards/:id/transactions/', getTransactionsController);
router.get('/cards/transactions/', getAllTransactionsController);
router.post('/cards/:id/transactions/', createTransactionController);
router.post('/cards/:id/pay/', cardToPhoneController);
router.post('/cards/:id/fill/', phoneToCardController);
router.post('/cards/:id/transfer/', cardToCardController);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.log('error', 'Error detected', err);
    ctx.status = 500;
    ctx.body = `Error [${err.message}] :(`;
  }
});

app.use(async (ctx, next) => {
  ctx.Model = Model;
  await next();
});

app.use(bodyParser());
app.use(router.routes());
app.use(serve('./public'));

const LISTEN_PORT = 3000;

if (!module.parent && process.env.NODE_HTTPS) {
  const protocolSecrets = {
    key: fs.readFileSync('keys/key.key'),
    cert: fs.readFileSync('keys/cert.crt')
  };

  https
      .createServer(protocolSecrets, app.callback())
      .listen(LISTEN_PORT, () => {
        logger.log('info', 'Application started HTTPS');
      });
}

if (!module.parent && !process.env.NODE_HTTPS) {
  http
      .createServer(app.callback())
      .listen(LISTEN_PORT, () => {
        logger.log('info', 'Application started HTTP');
      });
}

module.exports = app;
