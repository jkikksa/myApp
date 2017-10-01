// Удаление карты из хранилища - DELETE /cards/{id} - должен возвращать 200 в случае успешного удаления, если карта с переданным идентификатором не найдена, должен вернуть 404 Card not found


module.exports = async (ctx) => {
  const id = Number(ctx.params.id);

  if (id > 0) {
    const response = await ctx.Model.removeCard(id);
    ctx.body = response.success === true ? `Карта c id ${response.id} успешно удалена` : `Карта c id ${response.id} не найдена`;
  } else {
    throw new Error('Id карты должен быть больше 0');
  }
};
