module.exports = async (ctx) => {
  const cardId = Number(ctx.params.id);

  const card = await ctx.Model.getCard(cardId);
  const {phoneNumber, sum} = ctx.request.body;
  const amount = Number(sum);
  const balance = Number(card.balance);

  if (typeof card === 'undefined') {
    ctx.status = 404;
    ctx.body = 'Карта не найдена';
  }

  if (amount <= balance) {
    await ctx.Model.decreaseBalance(cardId, amount);
    await ctx.Model.createTransaction({
      cardId,
      type: 'paymentMobile',
      data: phoneNumber,
      time: (new Date()).toISOString(),
      sum: `${-amount}`
    });
    ctx.body = {
      'transactionStatus': 'ok',
      'message': 'Деньги успешно списаны'
    };
  } else {
    ctx.body = {
      'transactionStatus': 'error',
      'message': 'Недостаточно денег на карте'
    };
  }
};
