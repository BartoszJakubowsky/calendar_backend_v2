const express = require('express');
const authController = require('../controllers/authController');


const router = express.Router();

router.post('/register/submit', authController.register_submit);
router.post('/login', authController.login);
router.post('/register/add', authController.register_add);
router.delete('/register/delete', authController.register_delete);


router.post('/password/submit', authController.password_submit);
router.post('/password/add', authController.password_add);
router.delete('/password/delete', authController.password_delete);


router.post('/user/add', authController.user_add);
router.delete('/user/delete', authController.user_delete);


router.get('/data/all', authController.get_all);

module.exports = router;