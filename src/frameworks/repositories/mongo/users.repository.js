const mongoose = require('mongoose');

const entityName = 'User'

const {
  schemas: {
    user : UserSchema
  }
} = require('../../database/mongo')

const repository = () => {
  //Schema
  const UserModel = mongoose.model(entityName, UserSchema);

  return {
    add: async user => {
      const newUser = new UserModel(user);
      return await newUser.save();
    },

    update: async user => {
      const { id } = user;
      delete user.id;
      return await UserModel.findByIdAndUpdate(
        { _id: id }, { ...user }, { new: true }
      ).lean();
    },

    delete: async user => {
      const { id } = user;
      return await UserModel.findByIdAndDelete(id, { deletedAt : new Date()});
    },

    getById: async id => {
      return await UserModel.findById(id).lean();
    }
  }
}

module.exports = repository();