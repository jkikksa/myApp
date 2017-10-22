const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/app', {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

const transactionSchema = new mongoose.Schema({
  id: Number,
  cardId: Number,
  type: String,
  data: String,
  time: String,
  sum: String
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
