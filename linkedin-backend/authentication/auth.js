const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
   try {
      const token = req.cookies.token;
      if (!token) {
         return res.status(401).json({
            message: 'No token provided, please login again',
            success: false,
         });
      }
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
         return res.status(401).json({
            message: 'Invalid token, please login again',
            success: false,
         });
      }
      // Check if user exists
      const user = await User.findById(decoded.userId).select('-password');
      if (!user) {
         return res.status(404).json({
            message: 'User not found, please register again',
            success: false,
         });
      }
      req.user = user;
      next();
   } catch (error) {
      if (
         error.name === 'JsonWebTokenError' ||
         error.name === 'TokenExpiredError'
      ) {
         return res.status(401).json({
            message: 'Invalid or expired token, please login again',
            success: false,
         });
      }
      res.status(500).json({
         message: 'Server error',
         success: false,
      });
   }
};
