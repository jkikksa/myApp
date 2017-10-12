module.exports = async (ctx) => {
  const id = Number(ctx.params.id);

  if (id > 0) {
    const card = await ctx.Model.getCard(id);


    if (typeof card === 'undefined') {
      // throw new Error('Карта не найдена');
      ctx.status = 404;
      ctx.body = ('Карта не найдена');
    }

    const receiverCardId = ctx.request.body.receiverCardId;

    const amount = Number(ctx.request.body.amount);
    const balance = Number(card.balance);

    if (amount <= balance) {
      await ctx.Model.decreaseBalance(id, amount);
      await ctx.Model.increaseBalance(receiverCardId, amount);
      // ctx.request.body.sum = -amount;
      await ctx.Model.createTransaction(ctx.request.body);
      ctx.body = 'Деньги успешно переведены';
    } else {
      // throw new Error('Недостаточно денег на карте');
      // ctx.statusCode = 500;
      ctx.status = 400;
      ctx.body = ('Недостаточно денег на карте');
    }

  } else {
    throw new Error('Id карты должен быть больше 0');
  }
};
