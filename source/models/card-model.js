'use strict';

const CARDS_FILE = 'cards.json';

const FileModel = require('./file-model');
const fileModel = new FileModel(CARDS_FILE);

class CardModel {

	async getCard(id) {

	}

	async removeCard(card) {

	}

	async getAllCards() {
		return await fileModel.read();
	}

	async createCard(card) {
		const data = await fileModel.read();
		data.push(card);
		await fileModel.write(data);
		return card;
	}
}

module.exports = CardModel;
