const envConfig = require("../../config");

let ProductsDao;
let CarritosDao;


switch (envConfig.DATASOURCE) {
  case "mongo":
    ProductsDao = require("./products/products.mongo.dao");
    CarritosDao = require("./carritos/carritos.mongo.dao");

    break;
  case "firebase":
    ProductsDao = require("./products/products.firebase.dao");
    CarritosDao = require("./carritos/carritos.firebase.dao");
    break;

    case "memory":
    ProductsDao = require("./products/products.memory.dao");
    CarritosDao = require("./carritos/carritos.memory.dao");
    break;

  default:
    throw new Error("Invalid Datasource");
}

module.exports = {
  ProductsDao,
  CarritosDao,
};
