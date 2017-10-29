const CARD_TYPES = ['paymentMobile', 'prepaidCard', 'card2Card'];

const isTypeValid = (data) => {
  return data.hasOwnProperty('type') && CARD_TYPES.includes(data.type);
};

const isDataValid = (data) => {
  return data.hasOwnProperty('data');
};

const isSumValid = (data) => {
  return data.hasOwnProperty('sum');
};

const isTransactionDataValid = (data) => {
  return typeof data === 'object' ?
    isTypeValid(data) &&
    isDataValid(data) &&
    isSumValid(data) : false;
};

module.exports = async (ctx) => {

  const transactionData = ctx.request.body;
  if (isTransactionDataValid(transactionData)) {
    try {
      ctx.body = await ctx.Model.createTransaction(transactionData);
    } catch (err) {
      if (err.code === 11000) {
        ctx.status = 400;
        ctx.body = 'Такая транзакция уже существует';
      } else {
        throw new Error(err);
      }
    }
  } else {
    ctx.status = 400;
    ctx.body = 'Неправильный формат данных';
  }
};
