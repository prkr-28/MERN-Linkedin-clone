const CommentModel = require('../models/comment');
const PostModel = require('../models/post');
const NotificationModel = require('../models/notification');

exports.commentPost = async (req, res) => {
   try {
      const {postId, comment} = req.body;

      if (!postId || !comment) {
         return res
            .status(400)
            .json({message: 'Post ID and comment are required'});
      }

      const post = await PostModel.findById(postId).populate(
         'user',
         '-password'
      );
      if (!post) {
         return res.status(404).json({message: 'Post not found'});
      }

      const newComment = new CommentModel({
         user: req.user._id,
         post: postId,
         comment,
      });
      await newComment.save();

      // Populate user info after saving
      const populatedComment = await newComment.populate(
         'user',
         'f_name profile_pic'
      );

      // Increment comment count safely
      post.comments = (post.comments || 0) + 1;
      await post.save();

      // Create notification
      const notification = new NotificationModel({
         sender: req.user._id,
         receiver: post.user._id,
         content: `${req.user.f_name} has commented on your post`,
         type: 'comment',
         postId: postId.toString(),
      });
      await notification.save();

      return res.status(201).json({
         message: 'Comment added successfully',
         comment: populatedComment,
      });
   } catch (error) {
      console.error('Error commenting on post:', error);
      return res.status(500).json({message: 'Internal server error'});
   }
};

exports.getComments = async (req, res) => {
   try {
      const postId = req.params.postId;

      if (!postId) {
         return res.status(400).json({message: 'Post ID is required'});
      }

      const comments = await CommentModel.find({post: postId})
         .populate('user', '-password')
         .sort({createdAt: -1});

      return res.status(200).json({comments: comments});
   } catch (error) {
      console.error('Error fetching comments:', error);
      return res.status(500).json({message: 'Internal server error'});
   }
};
