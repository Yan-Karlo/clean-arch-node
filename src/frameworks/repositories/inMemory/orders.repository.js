const {
  inMemory: inMemoryDb
} = require('../../database') // is renaming

const { v4: uuidv4 } = require('uuid');


module.exports = {
  add: async order => {
    order.id = uuidv4();

    inMemoryDb.orders.push({...order});
    return order;
  },

  update: async order => {
    const index = inMemoryDb.orders.findIndex(item => item.id === order.id);

    if (index < 0) {
      return null;
    }

    inMemoryDb.orders[index] = order;
    return order;
  },

  delete: async order => {
    const index = inMemoryDb.orders.findIndex(item => item.id == order.id);

    if (index < 0) {
      return null;
    }

    inMemoryDb.orders.splice(index, 1);
    return order;
  },

  getById: async id => {
    const response =  inMemoryDb.orders.find(item => item.id == id);
    return response;
  },
}