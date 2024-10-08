const productController = require("../controllers/productController")
const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')

router.get('/',productController.getproducts);
router.post('/',productController.createproduct);
router.put('/:id',auth,productController.updateProduct);
router.delete('/',auth,productController.deleteProduct);

module.exports = router

