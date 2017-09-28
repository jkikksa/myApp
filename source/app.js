const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const Model = require('./models/model');

const getCardsController = require('./controllers/card/get-all');
const createCardsController = require('./controllers/card/create');
const getTransactionsController = require('./controllers/transaction/get');
const createTransactionController = require('./controllers/transaction/create');

const app = new Koa();
const router = new Router();

router.param('id', (id, ctx, next) => {
  return next();
});

app.use(async (ctx, next) => {
  ctx.Model = new Model();
  await next();
});

router.get('/cards/', getCardsController);
router.post('/cards/', createCardsController);
router.get('/cards/:id/transactions/', getTransactionsController);
router.post('/cards/:id/transactions/', createTransactionController);

app.use(bodyParser());
app.use(router.routes());
app.use(serve('./public'));

app.listen(3000);
