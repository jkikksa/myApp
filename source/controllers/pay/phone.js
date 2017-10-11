module.exports = async (ctx) => {
  const id = Number(ctx.params.id);

  if (id > 0) {
    const card = await ctx.Model.getCard(id);
    const amount = Number(ctx.request.body.sum);
    const balance = Number(card.balance);

    if (typeof card === 'undefined') {
      // throw new Error('Карта не найдена');
      ctx.status = 404;
      ctx.body = ('Карта не найдена');
    }

    if (amount <= balance) {
      await ctx.Model.changeBalance(id, amount);
      ctx.request.body.sum = -amount;
      await ctx.Model.createTransaction(ctx.request.body);
      ctx.body = 'Деньги успешно списаны';
    } else {
      // throw new Error('Недостаточно денег на карте');
      // ctx.statusCode = 500;
      ctx.status = 400;
      ctx.body = ('Недостаточно денег на карте');
    }


    // ctx.body = response.success ? `Карта c id ${response.id} успешно удалена` : `Карта c id ${response.id} не найдена`;
  } else {
    throw new Error('Id карты должен быть больше 0');
  }
};
