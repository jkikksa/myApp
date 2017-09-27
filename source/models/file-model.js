'use strict';

const fs = require('fs');
const path = require('path');

class FileModel {
	constructor() {
		this._sourceFile = path.join(__dirname, 'data', 'cards.json');
		this._sourceData = null;
	}
	async readFile() {
		await new Promise((resolve, reject) => {
			fs.readFile(this._sourceFile, (err, data) => {
				if (err) {
					return reject(err);
				}
				try {
					this._sourceData = JSON.parse(data);
					return resolve();
				} catch (e) {
					return reject(e);
				}
			});
		});
		return this._sourceData;
	}
	async saveFile(data) {
		await new Promise((resolve, reject) => {
			fs.writeFile(this._sourceFile, JSON.stringify(data, null, 4), (err) => {
				if (err) {
					return reject(err);
				}
				this._sourceData = data;
				return resolve();
			});
		});
	}
	async getAllCards() {
		return await this.readFile();
	}
}

module.exports = FileModel;
