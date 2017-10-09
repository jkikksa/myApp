module.exports = async (ctx) => {
  const id = Number(ctx.params.id);

  if (id > 0) {
    const card = await ctx.Model.getCard(id);
    const amount = Number(ctx.request.body.amount);
    const balance = Number(card.balance);

    if (typeof card === 'undefined') {
      throw new Error('Карта не найдена');
    }

    if (amount <= balance) {
      await ctx.Model.changeBalance(id, amount);
      ctx.body = 'Деньги успешно списаны';
    } else {
      throw new Error('Недостаточно денег на карте');
    }


    // ctx.body = response.success ? `Карта c id ${response.id} успешно удалена` : `Карта c id ${response.id} не найдена`;
  } else {
    throw new Error('Id карты должен быть больше 0');
  }
};
