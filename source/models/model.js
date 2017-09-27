'use strict';

const cardModel = new (require('./card-model'))();
const transactionModel = new (require('./transaction-model'))();

class Model {

	async getAllCards() {
		return await cardModel.getAllCards();
	}

	async createCard(card) {
		return await cardModel.createCard(card);
	}

	async getTransaction(cardId) {
		return await transactionModel.getTransaction(cardId);
	}

	async getAllTransaction() {
		return await transactionModel.getAllTransaction();
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
