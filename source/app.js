const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const Model = require('./models/model');

const getCardsController = require('./controllers/get-cards');
const createCardsController = require('./controllers/create-card');
const getTransactionController = require('./controllers/get-transaction');

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
router.get('/cards/:id/transactions/', getTransactionController);

app.use(bodyParser());
app.use(router.routes());
app.use(serve('./public'));

app.listen(3000);
