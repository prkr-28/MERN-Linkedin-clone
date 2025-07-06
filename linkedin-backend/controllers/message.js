const MessageModel = require('../models/message');

exports.sendMessage = async (req, res) => {
   try {
      const senderId = req.user._id;
      const {conversationId, text, picture} = req.body;

      if (!conversationId || !text) {
         return res
            .status(400)
            .json({message: 'Conversation ID and text are required'});
      }

      // Create a new message
      const newMessage = new MessageModel({
         conversation: conversationId,
         sender: senderId,
         text: text,
         picture: picture || null, // Optional field for picture
      });

      await newMessage.save();

      const resConversation = await newMessage.populate('sender', '-password');

      return res
         .status(200)
         .json({message: 'Message sent successfully', resConversation});
   } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).json({message: 'Internal server error'});
   }
};

exports.getAllMessages = async (req, res) => {
   try {
      const conversationId = req.params.conversationId;

      if (!conversationId) {
         return res.status(400).json({message: 'Conversation ID is required'});
      }

      // Find all messages in the conversation
      const messages = await MessageModel.find({conversation: conversationId})
         .populate('sender', '-password')
         .sort({createdAt: 1}); // Sort by creation time

      if (!messages || messages.length === 0) {
         return res.status(404).json({message: 'No messages found'});
      }

      return res.status(200).json({messages});
   } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({message: 'Internal server error'});
   }
};
