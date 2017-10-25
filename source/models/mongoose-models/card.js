const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  cardNumber: {
    type: String,
    unique: true,
    required: true
  },
  balance: {
    type: String,
    required: true
  }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
