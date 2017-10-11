module.exports = async (ctx) => {
  const id = Number(ctx.params.id);

  if (id > 0) {
    ctx.body = await ctx.Model.getAllTransactions(id);
  } else {
    throw new Error('Id карты должен быть больше 0');
  }
};
