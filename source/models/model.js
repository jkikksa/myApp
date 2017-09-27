'use strict';

const fileModel = new (require('./file-model'))();

class Model {

	async getAll() {
		return await fileModel.readFile();
	}

	async get() {

	}

	async create(card) {
		const data = await fileModel.readFile();
		data.push(card);
		await fileModel.saveFile(data);
		return card;
	}

	async remove(card) {

	}


}

module.exports = Model;
