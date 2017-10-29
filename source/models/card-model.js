const DbModel = require('./db-model');
const CardMongooseModel = require('./mongoose-models/card');

class CardModel extends DbModel {
  constructor() {
    super(CardMongooseModel);
  }

  async getAllCards() {
    return await this._getAll();
  }

  async getCard(cardId) {
    return await this._getOneById(cardId);
  }

  async createCard(cardData) {
    const newCardData = Object.assign({}, {
      'id': await this._generateId()
    }, cardData);
    return await this._create(newCardData);
  }

  async removeCard(cardId) {
    const card = await this.getCard(cardId);
    if (card === null) {
      return false;
    }
    await this._remove(cardId);
    return true;
  }

  async increaseBalance(cardId, amount) {
    const targetCard = await this.getCard(cardId);
    const balance = `${Number(targetCard.balance) + amount}`;
    await this._update({id: cardId}, {balance});
  }

  async decreaseBalance(cardId, amount) {
    const targetCard = await this.getCard(cardId);
    const balance = `${Number(targetCard.balance) - amount}`;
    await this._update({id: cardId}, {balance});
  }
}

module.exports = CardModel;
