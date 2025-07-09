const postModel = require('../models/post');

exports.createPost = async (req, res) => {
   try {
      const {desc, imageLink} = req.body;

      const newPost = new postModel({
         desc,
         imageLink,
         user: req.user._id,
      });

      if (!newPost) {
         return res.status(400).json({message: 'Post creation failed'});
      }

      await newPost.save();

      return res.status(201).json({
         message: 'Post created successfully',
         post: newPost,
      });
   } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({message: 'Internal server error'});
   }
};

exports.likePost = async (req, res) => {
   try {
      const {postId} = req.body;

      if (!postId) {
         return res.status(400).json({message: 'No such post found'});
      }

      const post = await postModel.findById(postId);

      if (!post) {
         return res.status(404).json({message: 'Post not found'});
      }

      const idx = post.likes.findIndex((id) => id.equals(req.user._id));
      if (idx !== -1) {
         // User has already liked the post, so we remove the like
         post.likes.splice(idx, 1);
      } else {
         // User has not liked the post, so we add the like
         post.likes.push(req.user._id);
      }

      await post.save();

      return res.status(200).json({
         message:
            idx !== -1
               ? 'Post unliked successfully'
               : 'Post liked successfully',
         likes: post.likes,
      });
   } catch (error) {
      console.error('Error liking post:', error);
      return res.status(500).json({message: 'Internal server error'});
   }
};

exports.getAllPosts = async (req, res) => {
   try {
      const posts = await postModel
         .find()
         .sort({createdAt: -1})
         .populate('user', '-password');

      return res.status(200).json({
         message: 'Posts retrieved successfully',
         posts,
      });
   } catch (error) {
      console.error('Error retrieving posts:', error);
      return res.status(500).json({message: 'Internal server error'});
   }
};

exports.getPostById = async (req, res) => {
   try {
      const {postId} = req.params;

      if (!postId) {
         return res.status(400).json({message: 'No such post found'});
      }

      const post = await postModel
         .findById(postId)
         .populate('user', '-password');

      if (!post) {
         return res.status(404).json({message: 'Post not found'});
      }

      return res.status(200).json({
         message: 'Post retrieved successfully',
         post,
      });
   } catch (error) {
      console.error('Error retrieving post:', error);
      return res.status(500).json({message: 'Internal server error'});
   }
};

exports.getTop5Posts = async (req, res) => {
   try {
      const {userId} = req.params;

      if (!userId) {
         return res.status(400).json({message: 'User ID is required'});
      }

      const posts = await postModel
         .find({user: userId})
         .sort({createdAt: -1})
         .limit(5)
         .populate('user', '-password');

      return res.status(200).json({
         message: 'Top 5 posts retrieved successfully',
         posts,
      });
   } catch (error) {
      console.error('Error retrieving top posts:', error);
      return res.status(500).json({message: 'Internal server error'});
   }
};

exports.getUserPosts = async (req, res) => {
   try {
      const {userId} = req.params;

      if (!userId) {
         return res.status(400).json({message: 'User ID is required'});
      }

      const posts = await postModel
         .find({user: userId})
         .sort({createdAt: -1})
         .populate('user', '-password');

      if (!posts || posts.length === 0) {
         return res.status(404).json({message: 'No posts found for this user'});
      }

      return res.status(200).json({
         message: 'User posts retrieved successfully',
         posts,
      });
   } catch (error) {
      console.error('Error retrieving user posts:', error);
      return res.status(500).json({message: 'Internal server error'});
   }
};
