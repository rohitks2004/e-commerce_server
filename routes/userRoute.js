const express = require('express')
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require('../middlewares/auth');

router.post('/signup',userController.createUser);
router.delete('/:id',userController.deleteUser);
router.put('/:id',userController.updateUser);
router.post('/login',userController.login)
module.exports = router;