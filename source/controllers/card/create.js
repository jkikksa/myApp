const utils = require('../../../libs/utils');

const isCardValid = (card) => {
  return typeof card === 'object' ? card.hasOwnProperty('cardNumber') && card.hasOwnProperty('balance') && utils.isCardNumberValid(card.cardNumber) : false;
};

module.exports = async (ctx) => {
  const card = ctx.request.body;

  if (isCardValid(card)) {
    const savedCard = await ctx.Model.createCard(card);
    ctx.body = savedCard;
  } else {
    ctx.status = 400;
    ctx.body = ('Невалидная карта');
  }
};
