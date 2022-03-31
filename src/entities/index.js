const { User, userConstants } = require('./User');
const { Product } = require('./product');
const { Order } = require('./order');

module.exports = {
  User,
  Product,
  Order,
  constants: {
    userConstants
  }
}