const { Response } = require('../../frameworks/common');

module.exports = dependencies => {
  const {
    useCases: {
      user: {
        getUserByIdUseCase
      }
    }
  } = dependencies;

  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const getById = getUserByIdUseCase(dependencies);
      const response = await getById.execute(id);

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