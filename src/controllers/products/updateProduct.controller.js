const {Response} = require('../../frameworks/common');

module.exports = dependencies => {
  const {
    useCases: {
      product: {
        updateProductUseCase
      }
    } } = dependencies;

  return async (req, res, next) => { // returning a fuction
    try {
      const { body = {} } = req;
      const {
        id,
        name,
        description,
        image,
        price,
        color,
        meta
      } = body;

      const updateProduct = updateProductUseCase(dependencies);
      const response = await updateProduct.execute({
        id,
        name,
        description,
        image,
        price,
        color,
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