const express = require('express');
const router = express.Router();
const Authentication = require('../authentication/auth');
const PostController = require('../controllers/post');

router.post('/', Authentication.auth, PostController.createPost);
router.post('/like', Authentication.auth, PostController.likePost);
router.get('/getAllPost', PostController.getAllPosts);
router.get('/getPost/:postId', PostController.getPostById);
router.get('/getTop5Posts/:userId', PostController.getTop5Posts);
router.get('/getAllUserPost/:userId', PostController.getUserPosts);

module.exports = router;
