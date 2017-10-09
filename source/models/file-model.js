const fs = require('fs');
const path = require('path');

class FileModel {
  constructor(fileName) {
    this._sourceFile = path.join(__dirname, 'data', fileName);
    this._sourceData = null;
  }

  async readFile() {
    if (this._sourceData === null) {
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
    }
    return this._sourceData;
  }

  async writeFile(data) {
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

  async getAll() {
    return this._sourceData;
  }

  async saveChanges() {
    await new Promise((resolve, reject) => {
      fs.writeFile(this._sourceFile, JSON.stringify(this._sourceData, null, 4), (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  }

  _generateId() {
    return this._sourceData.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  }

}

module.exports = FileModel;
