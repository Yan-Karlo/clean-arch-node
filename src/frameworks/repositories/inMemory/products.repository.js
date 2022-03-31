const {
  inMemory: inMemoryDb
} = require('../../database') // is renaming

const { v4: uuidv4 } = require('uuid');


module.exports = {
  add: async product => {
    product.id = uuidv4();

    inMemoryDb.products.push({...product});
    return product;
  },

  update: async product => {
    const index = inMemoryDb.products.findIndex(item => item.id === product.id);
    if (index < 0) {
      return null;
    }

    inMemoryDb.products[index] = product;
    return product;
  },

  delete: async product => {
    const index = inMemoryDb.products.findIndex(item => item.id == product.id);
    if (index < 0) {
      return null;
    }

    inMemoryDb.products.splice(index, 1);
    return product;
  },

  getById: async id => {
    const response = inMemoryDb.products.find(item => item.id == id);
    return response;
  },
}