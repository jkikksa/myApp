const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const Model = require('./models/model');

const getCardsController = require('./controllers/card/get-all');
const createCardController = require('./controllers/card/create');
const removeCardController = require('./controllers/card/remove');
const getTransactionsController = require('./controllers/transaction/get');
const createTransactionController = require('./controllers/transaction/create');

const app = new Koa();
const router = new Router();

router.param('id', (id, ctx, next) => {
  return next();
});

router.get('/cards/', getCardsController);
router.post('/cards/', createCardController);
router.delete('/cards/:id/', removeCardController);
router.get('/cards/:id/transactions/', getTransactionsController);
router.post('/cards/:id/transactions/', createTransactionController);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log('Error detected', err);
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

app.listen(3000);
