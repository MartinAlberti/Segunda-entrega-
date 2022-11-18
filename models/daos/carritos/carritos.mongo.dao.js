const { HTTP_STATUS } = require("../../../constants/api.constants");
const { HttpError } = require("../../../utils/api.utils");
const ProductsMongoDao = require("../../daos/products/products.mongo.dao");
const { Schema } = require("mongoose");
const MongoContainer = require("../../containers/mongo.container");

const productsMongoDao = new ProductsMongoDao

const collection = "carritos";
const cartSchema = new Schema({
  timestamp: { type: Date, default: new Date().toLocaleDateString() },
  products: { type: Array, required: true, default: [] },
});

class CarritosMongoDao extends MongoContainer {
  constructor() {
    super(collection, cartSchema);
  }

  async getProducts(cartId) {
    const cart = await this.getById(cartId);
    return [...cart.products];
  }

  async saveProduct(cartId, productId) {
    const product = await productsMongoDao.getById(productId);
    const updatedCart = await this.model.updateOne(
      { _id: cartId },
      { $push: { products: product } }
    );
    if (!updatedCart.matchedCount) {
      const message = `Cart with id ${cartId} does not exists`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return updatedCart;
  }

  async deleteProduct(cartId, productId) {
    const product = await productsMongoDao.getById(productId);
    const updatedCart = await this.model.updateOne(
      { _id: cartId },
      { $pull: { products: product } }
    );
    if (!updatedCart.matchedCount) {
      const message = `Cart with id ${cartId} does not exists`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return updatedCart;
  }
}
module.exports = CarritosMongoDao;
