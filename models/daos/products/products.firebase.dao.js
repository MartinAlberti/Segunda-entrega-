const { HttpError } = require("../../../utils/api.utils");
const { HTTP_STATUS } = require("../../../constants/api.constants");
const FirebaseContainer = require("../../containers/firebase.container");

const collection = "products";
class ProductsFirebaseDao extends FirebaseContainer {
  constructor() {
    super(collection);
  }
 
  async save(product) {
    const { name, description, code, imgUrl, price, stock } = product;

    if (!name || !description || !code || !imgUrl || !price || !stock) {
      const message = "Wrong body format: missing fields";
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message);
    }

    const docRef = this.query.doc();
    return await docRef.set({
      timestamp: new Date().toLocaleString(),
      ...product,
      
    })

  }
  

  async update(id, product) {
    const { name, description, code, imgUrl, price, stock } = product;

    if (!name || !description || !code || !imgUrl || !price || !stock) {
      const message = "Wrong body format: missing fields";
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message);
    }

    const docRef = this.query.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      const message = `Resource with id ${id} does not exists`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return await docRef.update(product);
  }
}

module.exports = ProductsFirebaseDao;
