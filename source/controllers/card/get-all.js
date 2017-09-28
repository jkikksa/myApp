module.exports = async (ctx) => {
  ctx.body = await ctx.Model.getAllCards();
};
