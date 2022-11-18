const { Router } = require("express");
const productsRoutes = require("../routers/products/products.routes");
const carritosRoutes = require("../routers/carritos/carritos.routes");

const router = Router();

router.use("/products", productsRoutes);
router.use("/carrito", carritosRoutes);

module.exports = router;
