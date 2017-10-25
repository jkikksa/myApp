class DbModel {
  constructor(dbModel) {
    this._MongooseModel = dbModel;
  }

  async _getAll() {
    return await this._MongooseModel
        .find()
        .lean()
        .exec();
  }

  async _getById(id) {
    return await this._MongooseModel
        .find({id})
        .lean()
        .exec();
  }

  async _create(item) {
    return await this._MongooseModel
        .create(item);
  }
}


module.exports = DbModel;
