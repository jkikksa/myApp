const Card = require('./card-db-model');

class CardModel {
  constructor() {
    this.Card = Card;
    this._cacheData = null;
  }

  async init() {
    await this.updateCache();
  }

  async updateCache() {
    this._cacheData = await this.readDB();
  }

  async readDB() {
    return await this.Card.find((err, cards) => {
      if (err) {
        throw new Error(err.message);
      }
      return cards;
    });
  }

  getAllCards() {
    const data = this.Card
        .find()
        .lean()
        .cursor();
    return data;
  }

  async getCard(cardId) {
    const cards = await this.getAllCards();
    return cards.find((it) => it.id === cardId);
  }

  async createCard(cardData) {
    const newCardData = Object.assign({}, {
      'id': this._generateId()
    }, cardData);
    const card = new this.Card(newCardData);
    const newCard = await card.save(async (err, data) => {
      if (err) {
        return err;
      }
      return data;
    });
    await this.updateCache();
    return newCard;
  }

  async removeCard(cardId) {
    const targetCard = await this.getCard(cardId);
    if (typeof targetCard === 'undefined') {
      return false;
    }

    await this.Card.remove({id: cardId}, (err) => {
      if (err) {
        throw new Error(err.message);
      }
    });
    await this.updateCache();
    return true;
  }

  async increaseBalance(cardId, amount) {
    const targetCard = await this.getCard(cardId);
    targetCard.balance = `${Number(targetCard.balance) + amount}`;

    await this.Card.update({id: cardId}, targetCard, (err) => {
      if (err) {
        throw new Error(err.message);
      }
    });

    await this.updateCache();
  }

  async decreaseBalance(cardId, amount) {
    const targetCard = await this.getCard(cardId);
    targetCard.balance = `${Number(targetCard.balance) - amount}`;

    await this.Card.update({id: cardId}, targetCard, (err) => {
      if (err) {
        throw new Error(err.message);
      }
    });

    await this.updateCache();
  }

  _generateId() {
    return this._cacheData.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  }
}

module.exports = CardModel;
