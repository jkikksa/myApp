// module.exports = async (ctx) => {
//   ctx.body = await ctx.Model.getAllCards();
// };


const NewCardModel = require('../../models/new-cards-model');
const cardModel = new NewCardModel();

module.exports = async (ctx) => {
  ctx.body = await cardModel.readFile();
};
