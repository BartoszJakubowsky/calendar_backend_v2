const express = require('express');
const authController = require('../controllers/authController');


const router = express.Router();

router.post('/register/submit', authController.register_submit);
router.post('/login', authController.login);
router.post('/register/add', authController.register_add);


router.post('/password/submit', authController.password_submit);
router.post('/password/add', authController.password_add);

router.get('/data/all', authController.get_all);

module.exports = router;