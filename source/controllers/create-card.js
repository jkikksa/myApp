'use strict';

module.exports = async (ctx) => {
	const card = ctx.request.body;
	const savedCard = await ctx.Model.createCard(card);
	ctx.body = savedCard;
};
