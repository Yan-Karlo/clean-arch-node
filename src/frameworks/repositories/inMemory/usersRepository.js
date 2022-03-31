const {
  inMemory: inMemoryDb
} = require('../../database') // is renaming

const { v4: uuidv4 } = require('uuid');


module.exports = {
  add: async user => {
    user.id = uuidv4();

    inMemoryDb.users.push({ ...user });
    return user;
  },

  update: async user => {
    const index = inMemoryDb.users.findIndex(item => item.id === user.id);
    if (index < 0) {
      return null;
    }

    inMemoryDb.users[index] = user;
    return user;
  },

  delete: async user => {
    const index = inMemoryDb.users.findIndex(item => item.id == user.id);
    if (index < 0) {
      return null;
    }

    inMemoryDb.users.splice(index, 1);
    return user;
  },

  getById: async id => {
    const response =  inMemoryDb.users.find(item => item.id == id);
    return response;
  },
}