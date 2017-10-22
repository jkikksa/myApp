const Transaction = require('./transaction-db-model');

class TransactionModel {
  constructor() {
    this.Transaction = Transaction;
    this._cacheData = null;
  }

  async init() {
    await this.updateCache();
  }

  async updateCache() {
    this._cacheData = await this.readDB();
  }

  async readDB() {
    return await this.Transaction.find((err, transactions) => {
      if (err) {
        throw new Error(err.message);
      }
      return transactions;
    });
  }

  async getAllTransactions() {
    return this._cacheData;
  }

  async getTransactions(cardId) {
    const transactions = await this.getAllTransactions();
    return transactions.filter((it) => it.cardId === cardId);
  }

  async createTransaction(transactionData) {
    const newTransactionData = Object.assign({}, {
      'id': this._generateId()
    }, transactionData);
    const transaction = new this.Transaction(newTransactionData);
    const newTransaction = await transaction.save((err, data) => {
      if (err) {
        return err;
      }
      return data;
    });
    await this.updateCache();
    return newTransaction;
  }

  _generateId() {
    return this._cacheData.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  }
}

module.exports = TransactionModel;
