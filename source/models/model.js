const cardModel = new (require('./card-model'))();
const transactionModel = new (require('./transaction-model'))();

class Model {
  async init() {
    await Promise.all([
      cardModel.init(),
      transactionModel.init()
    ]);
  }

  async getCard(cardId) {
    return await cardModel.getCard(cardId);
  }

  async increaseBalance(cardId, amount) {
    return await cardModel.increaseBalance(cardId, amount);
  }

  async decreaseBalance(cardId, amount) {
    return await cardModel.decreaseBalance(cardId, amount);
  }

  async getAllCards() {
    return await cardModel.getAllCards();
  }

  async createCard(card) {
    return await cardModel.createCard(card);
  }

  async removeCard(cardId) {
    return await cardModel.removeCard(cardId);
  }

  async getTransactions(cardId) {
    return await transactionModel.getTransactions(cardId);
  }

  getFileTransactions(cardId) {
    return transactionModel.getFileTransactions(cardId);
  }

  async getAllTransactions() {
    return await transactionModel.getAllTransactions();
  }

  async createTransaction(transactionData) {
    return await transactionModel.createTransaction(transactionData);
  }
}

module.exports = Model;
