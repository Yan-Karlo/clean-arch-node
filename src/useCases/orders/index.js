const addOrderUseCase = require('./addOrder.useCase');
const deleteOrderUseCase = require('./deleteOrder.useCase');
const updateOrderUseCase = require('./updateOrder.useCase');
const getOrderByIdUseCase = require('./getOrderById.useCase');


module.exports = {
  addOrderUseCase,
  deleteOrderUseCase,
  getOrderByIdUseCase,
  updateOrderUseCase,
}