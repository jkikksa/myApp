const cardModel = new (require('./card-model'))();
const transactionModel = new (require('./transaction-model'))();

class Model {
  static async getCard(cardId) {
    return await cardModel.getCard(cardId);
  }

  static async increaseBalance(cardId, amount) {
    return await cardModel.increaseBalance(cardId, amount);
  }

  static async decreaseBalance(cardId, amount) {
    return await cardModel.decreaseBalance(cardId, amount);
  }

  static async getAllCards() {
    return await cardModel.getAllCards();
  }

  static async createCard(card) {
    return await cardModel.createCard(card);
  }

  static async removeCard(cardId) {
    return await cardModel.removeCard(cardId);
  }

  static async getTransactions(cardId) {
    return await transactionModel.getTransactions(cardId);
  }

  static async getAllTransactions() {
    return await transactionModel.getAllTransactions();
  }

  static async createTransaction(transactionData) {
    return await transactionModel.createTransaction(transactionData);
  }
}

module.exports = Model;
