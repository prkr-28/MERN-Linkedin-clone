const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
      },
      desc: {
         type: String,
      },
      imageLink: {
         type: String,
         default: '',
      },
      likes: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
         },
      ],
      comments: {
         type: Number,
         default: 0,
      },
   },
   {timestamps: true}
);

const postModel = mongoose.model('post', postSchema);
module.exports = postModel;
