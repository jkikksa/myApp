'use strict';

const fs = require('fs');
const path = require('path');

class FileModel {
	constructor(fileName) {
		this._sourceFile = path.join(__dirname, 'data', fileName);
		this._sourceData = null;
	}
	async read() {
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
	async write(data) {
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
	// async getAll() {
	// 	return await this.readFile();
	// }
}

module.exports = FileModel;
