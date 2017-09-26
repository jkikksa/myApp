'use strict';
const Koa = require(`koa`);
const Router = require(`koa-router`);
const bodyParser = require(`koa-bodyparser`);
const serve = require(`koa-static`);

const getCardsController = require(`./controllers/cards/get-cards`);

const app = new Koa();
const router = new Router();

router.get(`/cards/`, getCardsController);

app.use(bodyParser());
app.use(router.routes());
app.use(serve(`./public`));

app.listen(3000);
