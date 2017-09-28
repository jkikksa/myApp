const TRANSACTIONS_FILE = 'transactions.json';

const FileModel = require('./file-model');
const fileModel = new FileModel(TRANSACTIONS_FILE);
fileModel.read();

class TransactionModel {

  async getTransactions(cardId) {
    const cards = await fileModel.read();
    return cards.filter((card) => card.cardId === cardId);
  }

  async createTransaction(transactionData) {
    const cards = await fileModel.read();
    transactionData.id = fileModel._generateId();
    cards.push(transactionData);
    await fileModel.write(cards);
    return transactionData;
  }
}

module.exports = TransactionModel;
