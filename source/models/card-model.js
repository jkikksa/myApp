const CARDS_FILE = 'cards.json';

const FileModel = require('./file-model');

class CardModel extends FileModel {
  constructor() {
    super(CARDS_FILE);
  }

  async removeCard(id) {
    const cards = await this.getAllCards();
    const cardIndex = cards.findIndex((it) => it.id === id);
    if (cardIndex !== -1) {
      cards.splice(cardIndex, 1);
      await this.writeFile(cards);
      return {
        success: true,
        id
      };
    } else {
      return {
        success: false,
        id
      };
    }
  }

  async getAllCards() {
    return await this.getAll();
  }

  async createCard(cardData) {
    const cards = await this.getAllCards();
    const newCard = Object.assign({}, {
      'id': this._generateId()
    }, cardData);
    await this.writeFile([...cards, newCard]);

    return newCard;
  }
}

module.exports = CardModel;
