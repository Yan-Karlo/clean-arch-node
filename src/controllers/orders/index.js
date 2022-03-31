const addOrderController = require('./addOrder.controller');
const deleteOrderController = require('./deleteOrder.controller');
const getOrderByIdController = require('./getOrderById.controller');
const updateOrderController = require('./updateOrder.controller');

module.exports = dependencies => {
  return {
    addOrderController : addOrderController(dependencies),
    deleteOrderController : deleteOrderController(dependencies),
    getOrderByIdController : getOrderByIdController(dependencies),
    updateOrderController: updateOrderController(dependencies),
  }
}
