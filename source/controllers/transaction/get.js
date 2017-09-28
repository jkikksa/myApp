module.exports = async (ctx) => {
  ctx.body = await ctx.Model.getTransactions(Number(ctx.params.id));
};
