'use strict';

const TRANSACTION_FILE = 'transactions.json';

const FileModel = require('./file-model');
const fileModel = new FileModel(TRANSACTION_FILE);

class TransactionModel {
	async getAllTransaction() {
		return await fileModel.read();
	}

	async getTransaction(cardId) {
		const data = await fileModel.read();
		return data[cardId];
	}

	async createTransaction(transactionData) {

	}
}

module.exports = TransactionModel;
