module.exports.Product = class Product{
  constructor({
    id,
    name = null,
    description = null,
    image = [],
    price = null,
    color = null,
    meta = {}
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.color = color;
    this.meta = meta;
  }
}