'use strict';

// module.exports = (ctx) => {
// 	ctx.body = await ctx.Model.getTransaction(ctx.params.id);
// 	// const res = await ctx.Model.getTransaction(ctx.params.id);
// 	// console.log(res);
// 	// ctx.body = res;
//
// };

module.exports = async (ctx) => {
	const res = await ctx.Model.getTransaction(ctx.params.id);
	ctx.body = res.type;
};
