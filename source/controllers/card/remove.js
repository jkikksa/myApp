// Удаление карты из хранилища - DELETE /cards/{id} - должен возвращать 200 в случае успешного удаления, если карта с переданным идентификатором не найдена, должен вернуть 404 Card not found


module.exports = async (ctx) => {
  const id = Number(ctx.params.id);

  if (id <= 0) {
    ctx.status = 404;
    ctx.body = 'Id карты должен быть больше 0';
  } else {
    try {
      await ctx.Model.removeCard(id);
      ctx.status = 200;
      ctx.body = 'Карта удалена успешно';
    } catch (err) {
      ctx.status = 404;
      ctx.body = err.message;
    }
  }
};
