const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const Authentication = require('../authentication/auth');
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/google-login', userController.googleLogin);
router.put('/update', Authentication.auth, userController.updateUser);

router.get('/user/:id', userController.getProfileById);
router.post('/logout', Authentication.auth, userController.logout);

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

router.get('/finduser', Authentication.auth, userController.findUser);
router.post(
   '/sendConnectionRequest',
   Authentication.auth,
   userController.sendConnectionRequest
);
router.post(
   '/acceptConnectionRequest',
   Authentication.auth,
   userController.acceptConnectionRequest
);

router.get('/connections', Authentication.auth, userController.getConnections);
router.get(
   '/pendingConnections',
   Authentication.auth,
   userController.getPendingConnections
);

router.delete(
   '/removeConnection/:connectionId',
   Authentication.auth,
   userController.removeConnection
);

module.exports = router;
