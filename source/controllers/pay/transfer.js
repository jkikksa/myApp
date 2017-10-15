module.exports = async (ctx) => {
  const cardId = Number(ctx.params.id);
  const {receiverCardId, sum} = ctx.request.body;

  if (cardId > 0 && receiverCardId > 0) {
    const card = await ctx.Model.getCard(cardId);
    const receiverCard = await ctx.Model.getCard(receiverCardId);

    if (typeof card === 'undefined' || typeof receiverCard === 'undefined') {
      ctx.status = 404;
      ctx.body = ('Карты не найдены');
    }

    const amount = Number(sum);
    const balance = Number(card.balance);

    if (amount <= balance) {
      await ctx.Model.decreaseBalance(cardId, amount);
      await ctx.Model.increaseBalance(receiverCardId, amount);

      await ctx.Model.createTransaction({
        cardId,
        type: 'card2Card',
        data: receiverCard.cardNumber,
        time: (new Date()).toISOString(),
        sum: `${-amount}`
      });

      await ctx.Model.createTransaction({
        cardId: receiverCardId,
        type: 'card2Card',
        data: card.cardNumber,
        time: (new Date()).toISOString(),
        sum: `${amount}`
      });

      ctx.body = 'Деньги успешно переведены';
    } else {
      ctx.status = 400;
      ctx.body = ('Недостаточно денег на карте');
    }

  } else {
    ctx.status = 404;
    ctx.body = 'Карты не найдены. Id карты должен быть больше 0';
  }
};
