const ArchivoContainer = require("../../containers/archivo.container");

class ProductsArchiveDao extends ArchivoContainer {
  constructor() {
    super("DB/productos.json");
  }
}

module.exports = ProductsArchiveDao;
