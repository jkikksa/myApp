const {Transform} = require('stream');
const json2csv = require('json2csv');
const fields = ['type', 'data', 'time', 'sum'];

module.exports = async (ctx) => {
  const id = Number(ctx.params.id);
  const data = ctx.Model.getFileTransactions(id);
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const toStringTransform = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      this.push(json2csv({data: chunk, fields}));
      callback();
    }
  });

  ctx.type = 'text/csv';
  ctx.set('Content-disposition', `attachment; filename=${day}-${month}-${year}-transactions-history.csv`);
  ctx.body = data.pipe(toStringTransform);
};
