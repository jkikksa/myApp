const TRANSACTIONS_FILE = 'transactions.json';

const FileModel = require('./file-model');
// const fileModel = new FileModel(TRANSACTIONS_FILE);
// fileModel.read();

class TransactionModel extends FileModel {
  constructor() {
    super(TRANSACTIONS_FILE);
  }

  async getTransactions(cardId) {
    const transactions = await this.readFile();
    return transactions.filter((it) => it.cardId === cardId);
  }

  async createTransaction(transactionData) {
    const transactions = await this.readFile();
    const newTransaction = Object.assign({}, {
      'id': this._generateId()
    }, transactionData);
    await this.writeFile([...transactions, newTransaction]);

    return newTransaction;
  }
}

module.exports = TransactionModel;
