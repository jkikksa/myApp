module.exports = async (ctx) => {
  const cardId = Number(ctx.params.id);
  const card = await ctx.Model.getCard(cardId);
  if (card === null) {
    ctx.status = 404;
    ctx.body = 'Карта не найдена';
    return;
  }
  ctx.body = await ctx.Model.getTransactions(cardId);
};
