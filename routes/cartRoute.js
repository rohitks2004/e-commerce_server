const express = require('express')
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middlewares/auth');


router.get('/',auth,cartController.showCart);
router.post('/',auth,cartController.addToCart);
router.delete('/:id',auth,cartController.removefromcart);


module.exports = router