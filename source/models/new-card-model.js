const DbModel = require('./db-model');
const CardMongooseModel = require('./mongoose-models/card');

class CardModel extends DbModel {
  constructor() {
    // super(CardMongooseModel);
    super(CardMongooseModel);
  }

  async getAllCards() {
    return await this._getAll();
  }
}

module.exports = CardModel;
