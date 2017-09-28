module.exports = async (ctx) => {
  ctx.body = await ctx.Model.createTransaction(ctx.request.body);
};
