const express = require('express');
const router = express.Router();
const Authentication = require('../authentication/auth');
const MessageController = require('../controllers/message');

router.post('/', Authentication.auth, MessageController.sendMessage);
router.get(
   '/getAllMessages/:conversationId',
   Authentication.auth,
   MessageController.getAllMessages
);

module.exports = router;
