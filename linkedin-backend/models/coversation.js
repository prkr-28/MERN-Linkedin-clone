const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
   {
      members: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
         },
      ],
   },
   {timestamps: true}
);

const conversationModel = mongoose.model('conversation', conversationSchema);
module.exports = conversationModel;
