const cardModel = new (require('./card-model'))();
const transactionModel = new (require('./transaction-model'))();

class Model {

  async getAllCards() {
    return await cardModel.getAllCards();
  }

  async createCard(card) {
    return await cardModel.createCard(card);
  }

  async getTransactions(cardId) {
    return await transactionModel.getTransactions(cardId);
  }

  async createTransaction(transactionData) {
    return await transactionModel.createTransaction(transactionData);
  }

  // async getTransaction(cardId) {
  //
  // }
  //
  // async createTransaction(transactionData) {
  //
  // }


}

module.exports = Model;
