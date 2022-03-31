module.exports = dependencies => {
  const { productsRepository } = dependencies;

  if (!productsRepository) {
    throw new Error('The product repository should exist in dependencies');
  }

  const execute = async (id) => {
    return await productsRepository.getById(id);
  }

  return { execute }
}