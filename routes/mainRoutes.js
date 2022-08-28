const controller = require('../controllers/mainController.js');
const express = require('express');
const router = express.Router();
const validate = require('../validation/auth.js')
router.use(express.static('../public'));

router.get('/', controller.index);
router.get('/login', controller.login);
router.post('/login', validate.postLogin, controller.postLogin);
router.get('/register', controller.register);
router.post('/register', validate.postRegister, controller.postRegister);
router.post('/logout', controller.logout);

router.get('/admin/users', controller.adminUsers);
router.post('/admin/users', controller.postAdminUsers);

module.exports = router