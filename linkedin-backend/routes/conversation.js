const express = require('express');
const router = express.Router();
const Authentication = require('../authentication/auth');
const ConversationController = require('../controllers/conversation');

router.post(
   '/add-conversation',
   Authentication.auth,
   ConversationController.addConversation
);

router.get(
   '/getAllConversations',
   Authentication.auth,
   ConversationController.getAllConversations
);

module.exports = router;
