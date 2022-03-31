const {Response} = require('../../frameworks/common');

module.exports = dependencies => {
  const {
    useCases: {
      order: {
        addOrderUseCase
      }
    } } = dependencies;

  return async (req, res, next) => { // returning a fuction
    try {
      const { body = {} } = req;
      const {
        userId,
        productIds,
        date,
        isPayed,
        meta
      } = body;

      const addOrder = addOrderUseCase(dependencies);
      const response = await addOrder.execute({
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