const express = require('express');
const router = express.Router();
const Authentication = require('../authentication/auth');
const CommentController = require('../controllers/comment');

router.post('/', Authentication.auth, CommentController.commentPost);

router.get('/:postId', CommentController.getComments);

module.exports = router;
