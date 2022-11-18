const admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');
const dbConfig = require("../../db/db.config");
const { HTTP_STATUS } = require('../../constants/api.constants') 
const { HttpError } = require('../../utils/api.utils') 


 admin.initializeApp({
  credential: admin.credential.cert(dbConfig.firebase.credentials),
  
});

class FirebaseContainer {
  constructor(collection) {
    const db = getFirestore();
    this.query = db.collection(collection);
  }

   static async  connect() {}

  async getAll() {
    const docRef = await this.query.get();
    const documents = docRef.docs;
    return documents.map((document) => {
      return {
        id: document.id,
        ...document.data(),
      };
    });
  }

  async getById(id) {
    const docRef = this.query.doc(id);
    const doc = await docRef.get()

    if (!doc) {
      const message = `Resource with id ${id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return {
      id: doc.id,
      ...doc.data()
    }
  }

  async save(item) {
    const docRef = this.query.doc()
    return await docRef.set(item)
  }

  async update(id, item) {
    const docRef = await this.query.doc(id);
    const doc = await docRef.get()

    if (!doc.exists) {
      const message = `Resource with id ${id} does not exist in our records`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return await docRef.update(item);
  }

  async delete(id) {
    const docRef = await this.query.doc(id)
    const doc = await docRef.get()
    if (!doc.exists) {
      const message = `Resource with id ${id} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return await docRef.delete()
  }
}

module.exports = FirebaseContainer;
