const express = require('express');
const router = express.Router();
const Authentication = require('../authentication/auth');
const NotificationController = require('../controllers/notification');

router.get(
   '/',
   Authentication.auth,
   NotificationController.getAllNotifications
);

router.put(
   '/markAsRead',
   Authentication.auth,
   NotificationController.markNotificationAsRead
);

router.get(
   '/getUnreadCount',
   Authentication.auth,
   NotificationController.getUnreadCount
);

module.exports = router;
