const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  cardId: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  sum: {
    type: String,
    required: true,
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
