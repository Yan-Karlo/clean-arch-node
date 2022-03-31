const { Order } = require('../../entities');
const { isEmpty } = require('lodash');
const { ResponseError, ValidationError } = require('../../frameworks/common');

module.exports = dependencies => {
  const {
    ordersRepository,
    useCases: {
      user: {
        getUserByIdUseCase
      },
      product: {
        getProductByIdUseCase
      },
    }
  } = dependencies;

  if (!ordersRepository) {
    throw new Error('The product repository should exist in dependencies');
  }

  if (!getUserByIdUseCase) {
    throw new Error('The getUserByIdUseCase should exist in dependencies');
  }

  if (!getProductByIdUseCase) {
    throw new Error('The getProductByIdUseCase should exist in dependencies');
  }

  const getUserById = getUserByIdUseCase(dependencies).execute;
  const getProductById = getProductByIdUseCase(dependencies).execute;

  getValidationErrors = async (order) => {
    const returnable = [];
    const { productIds = [], userId } = order;

    const products = await Promise.all(productIds.map(id => getProductById(id)));

    const notFoundIds = products.reduce((acc, product, index) => {
      if (!product) {
        acc.push(productIds[index]);
      }
      return acc;
    }, []);

    if (!isEmpty(notFoundIds)) {
      returnable.push(new ValidationError({field : 'productsIds', msg: `No products with ids : ${notFoundIds.join(', ')}` }))
    }

    const user = await getUserById({ _id: userId })

    if (!user) {
      returnable.push(new ValidationError({field : 'userId', msg: `No user with id : ${userId}`}))
    }

    return returnable;
  }

  const execute = async ({
    userId,
    productIds,
    date,
    isPayed,
    meta
  }) => {
    const order = new Order({
      userId,
      productIds,
      date,
      isPayed,
      meta
    })

    const validationErrors = await getValidationErrors( order );

    if (!isEmpty(validationErrors)) {
      return Promise.reject(
        new ResponseError({
          status: 403,
          msg: 'Validation Errors',
          reason: 'Somebody sent bad data',
          validationErrors
        })
      )
    }

    return ordersRepository.add(order);
  }

  return { execute }
}