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

  async _getOneById(id) {
    return await this._MongooseModel
        .findOne({id})
        .lean()
        .exec();
  }

  async _getAllByCond(cond) {
    return await this._MongooseModel
        .find(cond)
        .lean()
        .exec();
  }

  async _create(item) {
    return await this._MongooseModel
        .create(item);
  }

  async _remove(id) {
    return await this._MongooseModel
        .remove({id});
  }

  async _update(cond, set) {
    await this._MongooseModel
        .update(cond, {$set: set});
  }

  async _generateId() {
    const data = await this._MongooseModel
        .find({})
        .sort({id: -1})
        .limit(1)
        .lean()
        .exec();
    return data[0].id + 1;
  }
}

module.exports = DbModel;
