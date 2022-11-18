const FirebaseContainer = require("../../containers/firebase.container");
const { HTTP_STATUS } = require("../../../constants/api.constants");
const { HttpError } = require("../../../utils/api.utils");
const ProductsFirebaseDao = require("../../daos/products/products.firebase.dao");
const { FieldValue } = require("firebase-admin/firestore")

const productsFirebaseDao = new ProductsFirebaseDao()


const collection = "carritos";

class CarritosFirebaseDao extends FirebaseContainer {
  constructor() {
    super(collection);
  }

  async getProducts(cartId) {
    const cart = await this.getById(cartId)
    return [...cart.products]
  }

  async saveProduct(cartId, productId) {
    const product = await productsFirebaseDao.getById(productId)
    const docRef = this.query.doc(cartId)
    const doc = await docRef.get()
    if (!doc.exists) {
      const message = `Resource with id ${cartId} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return await docRef.update({ products: FieldValue.arrayUnion(product) })
  }

  async deleteProduct(cartId, productId) {
    const product = await productsFirebaseDao.getById(productId)
    const docRef = this.query.doc(cartId)
    const doc = await docRef.get()
    if (!doc.exists) {
      const message = `Resource with id ${cartId} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return await docRef.update({ products: FieldValue.arrayRemove(product) })
  }
}

module.exports = CarritosFirebaseDao;