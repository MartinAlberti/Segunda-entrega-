const fs = require("fs");

class ArchivoContainer {
  constructor(ruta) {
    this.ruta = ruta;
  }


  async createFileIfNoneExist() {
    let contenido;
    try {
      contenido = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(contenido);
    } catch (error) {
      if (error.code == "ENOENT") {
        await fs.writeFile(this.ruta, "[]");
        contenido = await fs.readFile(this.ruta, "utf-8");
      } else {
        console.log(error);
      }
    }

    return JSON.parse(contenido);
  }

  async getAll() {
    try {
      let contenido = await fs.promises.readFile(this.ruta, "utf-8");
      let contenidoJson = JSON.parse(contenido);
      return contenidoJson;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getById(id) {
    try {
      let contenido = await fs.promises.readFile(this.ruta, "utf-8");
      let contenidoJson = JSON.parse(contenido);
      let contenidoExtraidoDelArray;

      contenidoJson.forEach((element) => {
        if (element.id == id) {
          contenidoExtraidoDelArray = element;
        }
      });
      return contenidoExtraidoDelArray;
    } catch (error) {
      console.log(error.message);
    }
  }

  async save(item) {
    try {
      let contenido = await fs.promises.readFile(this.name, "utf-8");
      let contenidoJson = JSON.parse(contenido);
      let ultimoIndice = contenidoJson.length - 1;
      let ultimoID = contenidoJson[ultimoIndice].id;
      item.id = ultimoID + 1;
      let id = item.id;
      contenidoJson.push(item);
      await fs.promises.writeFile(this.name, JSON.stringify(contenidoJson));
      return id;
      // console.log(contenidoJson)
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(id, item) {}

  async delete(id) {
    try {
      let arr = await this.getAll();
      let found = arr.find((item) => item.id == id);
      if (!found) {
        return console.log("No se encontro el producto");
      } else {
        let toDelete = arr.indexOf(found);
        arr.spice(toDelete, 1);
        await fs.promises.writeFile(this.ruta, JSON.stringify(arr));
        return console.log("Producto eliminado");
      }
    } catch (error) {
      console.log(erro.message);
    }
  }
}

module.exports = ArchivoContainer;
