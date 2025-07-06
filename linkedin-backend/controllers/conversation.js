const ConversationModel = require('../models/coversation');
const MessageModel = require('../models/message');

exports.addConversation = async (req, res) => {
   try {
      const senderId = req.user._id;
      const {recieverId, message} = req.body;
      if (!recieverId || !message) {
         return res
            .status(400)
            .json({message: 'Receiver ID and message are required'});
      }
      // Check if the conversation already exists
      let conversation = await ConversationModel.findOne({
         members: {$all: [senderId, recieverId]},
      });
      // If conversation does not exist, create a new one
      if (!conversation) {
         conversation = new ConversationModel({
            members: [senderId, recieverId],
         });
         await conversation.save();
         let newMessage = new MessageModel({
            conversation: conversation._id,
            sender: senderId,
            text: message,
         });
         await newMessage.save();
      }
      // If conversation exists, just add the message
      else {
         let addMessage = new MessageModel({
            conversation: conversation._id,
            sender: senderId,
            text: message,
         });
         await addMessage.save();
      }
      return res.status(200).json({
         message: 'Conversation added successfully',
         conversationId: conversation._id,
      });
   } catch (error) {
      console.error('Error adding conversation:', error);
      return res.status(500).json({message: 'Internal server error'});
   }
};

exports.getAllConversations = async (req, res) => {
   try {
      const userId = req.user._id;
      // Find all conversations where the user is a member
      const conversations = await ConversationModel.find({
         members: {$in: [userId]},
      })
         .populate('members', '-password')
         .sort({updatedAt: -1});

      if (!conversations || conversations.length === 0) {
         return res.status(404).json({message: 'No conversations found'});
      }

      return res.status(200).json({
         message: 'Conversations retrieved successfully',
         conversations: conversations,
      });
   } catch (error) {
      console.error('Error retrieving conversations:', error);
      return res.status(500).json({message: 'Internal server error'});
   }
};
