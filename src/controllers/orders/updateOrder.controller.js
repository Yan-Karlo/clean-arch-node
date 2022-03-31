const {Response} = require('../../frameworks/common');

module.exports = dependencies => {
  const {
    useCases: {
      order: {
        updateOrderUseCase
      }
    } } = dependencies;

  return async (req, res, next) => { // returning a fuction
    try {
      const { body = {} } = req;
      const {
        id,
        userId,
        productIds,
        date,
        isPayed,
        meta
      } = body;

      const updateOrder = updateOrderUseCase(dependencies);
      const response = await updateOrder.execute({
        id,
        userId,
        productIds,
        date,
        isPayed,
        meta
      });

      res.json(new Response({
        status: true,
        content: response,
      }))

      next();

    } catch (error) {
      next(error)
    }
  }
}