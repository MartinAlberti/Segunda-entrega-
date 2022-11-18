
const { Schema } = require('mongoose');
const { stringify } = require('uuid');
const MongoContainer = require("../../containers/mongo.container");

const collection = "products";
const productSchema = new Schema({
  name: { type: String },
  description: { type: String },
  code: { type: String },
  price: { type: Number },
  imgUrl: { type: String },
  stock: { type: Number },
  timestamp: { type: String, default: new Date().toLocaleString() },
});

class ProductsMongoDao extends MongoContainer {
  constructor() {
    super(collection, productSchema);
  }
}

module.exports = ProductsMongoDao