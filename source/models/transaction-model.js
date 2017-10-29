const DbModel = require('./db-model');
const TransactionMongooseModel = require('./mongoose-models/transaction');

class TransactionModel extends DbModel {
  constructor() {
    super(TransactionMongooseModel);
  }

  async getAllTransactions() {
    return await this._getAll();
  }

  async getTransactions(cardId) {
    return await this._getAllByCond({cardId});
  }

  async createTransaction(transactionData) {
    const newTransactionData = Object.assign({}, {
      'id': await this._generateId()
    }, transactionData);
    return await this._create(newTransactionData);
  }
}

module.exports = TransactionModel;
