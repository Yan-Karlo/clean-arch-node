const {Product} = require('../../entities');

module.exports = dependencies => {
  const { productsRepository } = dependencies;

  if (!productsRepository) {
    throw new Error('The product repository should exist in dependencies');
  }

  const execute = async ({
    name,
    description,
    image,
    price,
    color,
    meta,
  }) => {
    const product = new Product({
      name,
      description,
      image,
      price,
      color,
      meta,
    })

    return await productsRepository.add(product);
  }

  return { execute }
}