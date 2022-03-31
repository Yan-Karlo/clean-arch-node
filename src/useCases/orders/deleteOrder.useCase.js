const Order = require('../../entities');


module.exports = dependencies => {
  const { ordersRepository } = dependencies;

  if (!ordersRepository) {
    throw new Error('The product repository should exist in dependencies');
  }

  const execute = (order) => {
    return ordersRepository.delete(order);
  }

  return {execute}
}