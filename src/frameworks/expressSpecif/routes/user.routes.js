const express = require('express');
const { userControllers } = require('../../../controllers');

module.exports = dependencies => {
  const router = express.Router();
  const {
    addUserController,
    getUserByIdController,
    deleteUserController,
    updateUserController
  } = userControllers(dependencies);

  router.route('/')
    .post(addUserController)
    .delete(deleteUserController)
    .put(updateUserController);
  router.route('/:id').get(getUserByIdController);

  return router;
}