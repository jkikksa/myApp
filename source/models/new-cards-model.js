const Card = require('../../libs/db');

class NewCardModel {
  constructor() {
    this.Card = Card;
    this._sourceData = null;
  }

  async readFile() {
    if (this._sourceData === null) {
      await this.Card.find((err, cards) => {
        if (err) {
          throw new Error(err.message);
        }
        this._sourceData = cards;
      });
    }

    return this._sourceData;
  }

  async updateCache() {
    await this.Card.find((err, cards) => {
      if (err) {
        throw new Error(err.message);
      }
      this._sourceData = cards;
    });
  }

  async getAll() {
    return this._sourceData;
  }

  async getCard(cardId) {
    const cards = await this.getAll();
    return cards.find((it) => it.id === cardId);
  }

  async createCard(cardData) {
    const card = new this.Card(cardData);
    return await card.save((err) => {
      if (err) {
        throw new Error(err.message);
      }
      console.log('saved');
      this.updateCache();
      return card;
    });
  }
}

module.exports = NewCardModel;
