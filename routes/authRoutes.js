const express = require('express');
const authController = require('../controllers/authController');


const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/password', authController.password);
router.post('/add_user', authController.add_user);
router.post('/add_password', authController.add_password);
router.get('/get_all', authController.get_all);

module.exports = router;