
const mongoose = require('mongoose');

const entityName = 'Order'

const {
  schemas: {
    order : OrderSchema
  }
} = require('../../database/mongo')

const repository = () => {
  //Schema
  const OrderModel = mongoose.model(entityName, OrderSchema);

  return {
    add: async order => {
      console.log('order',order);
      const newOrder = new OrderModel(order);
      console.log('newOrder',newOrder);
      return await newOrder.save();
    },

    update: async order => {
      const { id } = order;
      delete order.id;
      return await OrderModel.findByIdAndUpdate(
        { _id:id }, { ...order }, { new: true }
      ).lean();
    },

    delete: async order => {
      const { id } = order;
      return await OrderModel.findByIdAndDelete(id, { deletedAt : new Date()});
    },

    getById: async id => {
      return await OrderModel.findById(id).lean();
    }
  }
}

module.exports = repository();
