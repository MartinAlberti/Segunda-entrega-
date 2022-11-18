const envConfig = require('../config');
const firebaseConfig = require('./firebase/firebase.config.json');

module.exports = {
  memory: {
    products: [],
    carts: [],
  },
  mongodb: {
    uri: `mongodb+srv://Martin:${envConfig.DB_PASSWORD}@coderhouse.y8qvc3g.mongodb.net/?retryWrites=true&w=majority`
  },
  firebase: {
    credentials: firebaseConfig
  },
}
