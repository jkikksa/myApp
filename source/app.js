'use strict';
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const Model = require('./models/model');

const getCardsController = require('./controllers/get-cards');
const createCardsController = require('./controllers/create');

const app = new Koa();
const router = new Router();

router.get('/cards/', getCardsController);
router.post('/cards/', createCardsController);

app.use(async (ctx, next) => {
	ctx.Model = new Model();
	await next();
});

app.use(bodyParser());
app.use(router.routes());
app.use(serve('./public'));

app.listen(3000);
