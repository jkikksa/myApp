const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const {renderToStaticMarkup} = require('react-dom/server');

const Model = require('./models/model');
const getCardsController = require('./controllers/card/get-all');

const payPhoneController = require('./controllers/pay/phone');
const fillPhoneController = require('./controllers/pay/fill');
const transferController = require('./controllers/pay/transfer');

const createCardController = require('./controllers/card/create');
const removeCardController = require('./controllers/card/remove');

const getTransactionsController = require('./controllers/transaction/get');
const getFileTransactionsController = require('./controllers/transaction/get-file');
const getAllTransactionsController = require('./controllers/transaction/get-all');
const createTransactionController = require('./controllers/transaction/create');

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
router.get('/cards/:id/file-transactions/', getFileTransactionsController);
router.get('/cards/transactions/', getAllTransactionsController);
router.post('/cards/:id/transactions/', createTransactionController);

router.post('/cards/:id/pay/', payPhoneController);
router.post('/cards/:id/fill/', fillPhoneController);
router.post('/cards/:id/transfer/', transferController);

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
  ctx.Model = new Model();
  await ctx.Model.init();
  await next();
});

app.use(bodyParser());
app.use(router.routes());
app.use(serve('./public'));

app.listen(3000, () => {
  logger.log('info', 'Application started');
});

module.exports = app;
