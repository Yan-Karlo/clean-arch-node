module.exports = dependencies => {
  const { productsRepository } = dependencies;

  if (!productsRepository) {
    throw new Error('The product repository should exist in dependencies');
  }

  const execute = async (product) => {
    return await productsRepository.update(product);
  }

  return { execute }
}