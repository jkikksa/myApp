const CARD_TYPES = ['paymentMobile', 'prepaidCard', 'card2Card'];

const isTypeValid = (data) => {
  return data.hasOwnProperty('type') && CARD_TYPES.includes(data.type);
};

const isDataValid = (data) => {
  return data.hasOwnProperty('data');
};

// const isTimeValid = (data) => {
//   return data.hasOwnProperty('time');
// };

const isSumValid = (data) => {
  return data.hasOwnProperty('sum');
};

const isTransactionDataValid = (data) => {
  return typeof data === 'object' ?
    isTypeValid(data) &&
    isDataValid(data) &&
    // isTimeValid(data) &&
    isSumValid(data) : false;
};

module.exports = async (ctx) => {
  const cardId = Number(ctx.params.id);

  if (cardId > 0) {
    const transactionData = ctx.request.body;
    if (isTransactionDataValid(transactionData)) {
      ctx.body = await ctx.Model.createTransaction(transactionData);
    } else {
      throw new Error('Неправильный формат данных');
    }
  } else {
    throw new Error('Id карты должен быть больше 0');
  }
};
