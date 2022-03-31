const addProductController = require('./addProduct.controller');
const deleteProductController = require('./deleteProduct.controller');
const getProductByIdController = require('./getProductById.controller');
const updateProductController = require('./updateProduct.controller');

module.exports = dependencies => {
  return {
    addProductController : addProductController(dependencies),
    deleteProductController : deleteProductController(dependencies),
    getProductByIdController : getProductByIdController(dependencies),
    updateProductController: updateProductController(dependencies),
  }
}
