const {Transform} = require('stream');

module.exports = async (ctx) => {
  const data = ctx.Model.getAllCards();

  const toStringTransform = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      const cardNumber = chunk.cardNumber;
      chunk.cardNumber = `${cardNumber.slice(0, 6)}******${cardNumber.slice(-4)}`;
      this.push(JSON.stringify(chunk));
      callback();
    }
  });
  ctx.body = data.pipe(toStringTransform);
};
