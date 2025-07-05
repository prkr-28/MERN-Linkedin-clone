const NotificationModel = require('../models/notification');

exports.getAllNotifications = async (req, res) => {
   try {
      const notifications = await NotificationModel.find({
         receiver: req.user._id,
      })
         .sort({createdAt: -1})
         .populate('sender', '-password');
      if (!notifications || notifications.length === 0) {
         return res.status(404).json({message: 'No notifications found'});
      }
      return res.status(200).json({
         message: 'Notifications retrieved successfully',
         notifications,
      });
   } catch (error) {
      console.error('Error retrieving notifications:', error);
      return res.status(500).json({message: 'Internal server error'});
   }
};

exports.markNotificationAsRead = async (req, res) => {
   try {
      const {notificationId} = req.body;

      if (!notificationId) {
         return res.status(400).json({message: 'Notification ID is required'});
      }

      const notification = await NotificationModel.findOneAndUpdate(
         {_id: notificationId},
         {isRead: true},
         {new: true} // Return the updated doc
      );

      if (!notification) {
         return res.status(404).json({message: 'Notification not found'});
      }

      return res.status(200).json({
         message: 'Notification marked as read successfully',
         notification,
      });
   } catch (error) {
      console.error('Error marking notification as read:', error);
      return res.status(500).json({message: 'Internal server error'});
   }
};

exports.getUnreadCount = async (req, res) => {
   try {
      const unreadCount = await NotificationModel.countDocuments({
         receiver: req.user._id,
         isRead: false,
      });

      return res.status(200).json({
         message: 'Unread notifications count retrieved successfully',
         unreadCount,
      });
   } catch (error) {
      console.error('Error retrieving unread notifications count:', error);
      return res.status(500).json({message: 'Internal server error'});
   }
};
