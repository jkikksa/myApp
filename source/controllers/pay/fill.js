module.exports = async (ctx) => {
  const cardId = Number(ctx.params.id);

  if (cardId > 0) {
    const card = await ctx.Model.getCard(cardId);
    const {number, sum} = ctx.request.body;
    const amount = Number(sum);

    if (typeof card === 'undefined') {
      ctx.status = 404;
      ctx.body = 'Карта не найдена';
    }

    await ctx.Model.increaseBalance(cardId, amount);
    await ctx.Model.createTransaction({
      cardId,
      type: 'prepaidCard',
      data: number,
      time: (new Date()).toISOString(),
      sum: `${amount}`
    });

    ctx.body = {
      'transactionStatus': 'ok',
      'message': 'Карта успешно пополнена'
    };

  } else {
    ctx.status = 404;
    ctx.body = 'Карта не найдена. Id карты должен быть больше 0';
  }
};
