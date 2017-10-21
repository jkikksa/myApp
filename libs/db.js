const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/app', {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

const cardSchema = new mongoose.Schema({
  id: Number,
  cardNumber: {
    type: String,
    required: true,
  },
  balance: String
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
