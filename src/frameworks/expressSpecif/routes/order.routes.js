const express = require('express');
const { orderControllers } = require('../../../controllers');

module.exports = dependencies => {
  const router = express.Router();
  const {
    addOrderController,
    getOrderByIdController,
    deleteOrderController,
    updateOrderController
  } = orderControllers(dependencies);

  router.route('/')
    .post(addOrderController)
    .delete(deleteOrderController)
    .put(updateOrderController);
  router.route('/:id').get(getOrderByIdController);

  return router;
}