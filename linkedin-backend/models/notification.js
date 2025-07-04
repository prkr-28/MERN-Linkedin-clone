const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
   {
      sender: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user',
         required: true,
      },
      receiver: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user',
         required: true,
      },
      content: {
         type: String,
         required: true,
      },
      type: {
         type: String,
         enum: ['connectionRequest', 'comment'],
         required: true,
      },
      isRead: {
         type: Boolean,
         default: false,
      },
      postId: {
         type: String,
         default: '',
      },
   },
   {timestamps: true}
);

const notificationModel = mongoose.model('notification', notificationSchema);
module.exports = notificationModel;
