const controller = require('../controllers/blogController.js');
const express = require('express');
const router = express.Router();
const validate = require('../validation/blog');

router.use(express.static('../public'));

router.get('/add', controller.addBlog);
router.post('/add', validate.postBlog, controller.postBlog);
router.get('/:id', controller.getBlog);
router.delete('/:id', controller.delBlog);
router.post('/:id/comment', validate.comment, controller.comment);

module.exports = router