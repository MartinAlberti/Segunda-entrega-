const { HTTP_STATUS } = require("../constants/api.constants");
const { CarritosDao } = require("../models/daos/app.daos");
const { successResponse } = require("../utils/api.utils");

const carritosDao = new CarritosDao();

class CarritosController {
  async getCarts(req, res, next) {
    try {
      const carts = await carritosDao.getAll();
      const response = successResponse(carts);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getOneCart(req, res, next) {
    try {
      const { cartId } = req.params;
      const cart = await carritosDao.getById(cartId);
      const response = successResponse(cart);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async createCart(req, res, next) {
    try {
      const newCart = await carritosDao.save();
      const response = successResponse(newCart);
      res.satuts(HTTP_STATUS.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }
  async deleteCart(req, res, next) {
    const { id } = req.params;
    try {
      const deletedCart = await carritosDao.delete(id);
      const response = successResponse(deletedCart);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req, res, next) {
    const { id } = req.params;

    try {
      const producs = await carritosDao.getProducts(id);
      const response = successResponse(producs);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async saveProduct(req, res, next) {
    const { cartId, productId } = req.params;
    try {
      const newProduct = await carritosDao.saveProduct(cartId, productId);
      const response = successResponse(newProduct);
      res.satuts(HTTP_STATUS.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    const { cartId, productId } = req.params;
    try {
      const deletedProduct = await carritosDao.deleteProduct(cartId, productId);
      const response = successResponse(deletedProduct);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CarritosController();
