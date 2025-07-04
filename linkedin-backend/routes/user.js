const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const Authentication = require('../authentication/auth');
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/google-login', userController.googleLogin);
router.put('/update', Authentication.auth, userController.updateUser);

router.get('/self', Authentication.auth, async (req, res) => {
   try {
      // Return the user details from the request
      return res.status(200).json({
         message: 'User details fetched successfully',
         user: req.user,
      });
   } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({message: 'Internal server error'});
   }
});

module.exports = router;
