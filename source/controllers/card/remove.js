module.exports = async (ctx) => {
  const cardId = Number(ctx.params.id);

  const result = await ctx.Model.removeCard(cardId);
  if (result) {
    ctx.body = `Карта c id ${cardId} успешно удалена`;
  } else {
    ctx.status = 404;
    ctx.body = `Карта c id ${cardId} не найдена`;
  }
};
