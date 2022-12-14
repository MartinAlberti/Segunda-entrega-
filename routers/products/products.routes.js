const { Router } = require ("express");
const productsController = require("../../controllers/products.controller");

const router = Router()

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post('/', productsController.saveProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deletProduct);

module.exports = router;