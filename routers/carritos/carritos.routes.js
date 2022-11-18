const { Router } = require("express");
const carritosController = require("../../controllers/carritos.controller");

const router = Router();

router.get("/", carritosController.getCarts)
router.post("/", carritosController.createCart);
router.get('/:idCart', carritosController.getOneCart);
router.delete("/:id", carritosController.deleteCart);
router.get("/:id/products", carritosController.getProducts);
router.post("/:cartId/products/productId", carritosController.saveProduct);
router.delete("/:cartId/products/productId", carritosController.deleteProduct);

module.exports = router;
