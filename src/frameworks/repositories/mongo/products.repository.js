
const mongoose = require('mongoose');

const entityName = 'Product'

const {
  schemas: {
    product : ProductSchema
  }
} = require('../../database/mongo')

const repository = () => {
  //Schema
  const ProductModel = mongoose.model(entityName, ProductSchema);

  return {
    add: async product => {
      const newProduct = new ProductModel(product);
      return await newProduct.save();
    },

    update: async product => {
      const { id } = product;
      delete product.id;
      return await ProductModel.findByIdAndUpdate(
        { _id:id }, { ...product }, { new: true }
      ).lean();
    },

    delete: async product => {
      const { id } = product;
      return await ProductModel.findByIdAndDelete(id, { deletedAt : new Date()});
    },

    getById: async id => {
      return await ProductModel.findById(id).lean();
    }
  }
}

module.exports = repository();