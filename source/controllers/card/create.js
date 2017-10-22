const utils = require('../../../libs/utils');

const isCardValid = (card) => {
  return typeof card === 'object' ? card.hasOwnProperty('cardNumber') && card.hasOwnProperty('balance') && utils.isCardNumberValid(card.cardNumber) : false;
};

module.exports = async (ctx) => {
  const card = ctx.request.body;

  if (isCardValid(card)) {
    try {
      const savedCard = await ctx.Model.createCard(card);
      ctx.body = savedCard;
    } catch (err) {
      if (err.code === 11000) {
        ctx.status = 404;
        ctx.body = 'Такая карта уже существует';
      } else {
        throw new Error(err);
      }
    }
  } else {
    ctx.status = 404;
    ctx.body = 'Невалидная карта';
  }
};
