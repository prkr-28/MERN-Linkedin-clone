const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotificationModel = require('../models/notification');

const cookieOptions = {
   httpOnly: true,
   secure: false, // set to true in production
   sameSite: 'Lax', // set to 'None'
};

exports.register = async (req, res) => {
   try {
      let {f_name, email, password} = req.body;

      if (!f_name || !email || !password) {
         return res.status(400).json({message: 'All fields are required'});
      }
      // Check if user already exists
      const existingUser = await User.findOne({email: email});
      if (existingUser) {
         return res.status(400).json({message: 'User already exists'});
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user
      const newUser = new User({
         f_name: f_name,
         email: email,
         password: hashedPassword,
      });
      // Save the user to the database
      await newUser.save();
      // Respond with success
      return res.status(201).json({
         message: 'User registered successfully',
         success: true,
      });
   } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({message: 'Internal server error'});
   }
};

exports.login = async (req, res) => {
   try {
      const {email, password} = req.body;

      if (!email || !password) {
         return res
            .status(400)
            .json({message: 'Email and password are required'});
      }

      // Find the user by email
      const user = await User.findOne({email: email});
      if (!user) {
         return res.status(400).json({message: 'Invalid email or password'});
      }

      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({message: 'Invalid email or password'});
      }

      // Generate a JWT token
      const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
         expiresIn: '1day',
      });
      // Set the token in a cookie
      res.cookie('token', token, cookieOptions);

      // Respond with success
      return res
         .status(200)
         .json({message: 'Login successful', user: user, token: token});
   } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({message: 'Internal server error'});
   }
};

exports.googleLogin = async (req, res) => {
   try {
      const {tokenId} = req.body;
      if (!tokenId) {
         return res.status(400).json({message: 'Token ID is required'});
      }
      // Verify the token with Google
      const {OAuth2Client} = require('google-auth-library');
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
         idToken: tokenId,
         audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const {email, name, sub, picture} = payload;
      // Check if user already exists
      let user = await User.findOne({email: email});
      if (!user) {
         // Create a new user if not exists
         user = await User.create({
            googleId: sub,
            email: email,
            f_name: name,
            profilePic: picture,
         });
      }
      // Generate a JWT token
      const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
         expiresIn: '1day',
      });
      // Set the token in a cookie
      res.cookie('token', token, cookieOptions);

      // Respond with success
      return res.status(200).json({
         message: 'Google login successful',
         user: user,
         name: user.name,
      });
   } catch (error) {
      console.error('Error during Google login:', error);
      res.status(500).json({message: 'Internal server error'});
   }
};

exports.updateUser = async (req, res) => {
   try {
      const {user} = req.body;
      const userexists = await User.findById(req.user._id);
      if (!userexists) {
         return res.status(404).json({message: 'User not found'});
      }
      // Update user details
      const updatedUser = await User.findByIdAndUpdate(userexists._id, user, {
         new: true,
         runValidators: true,
      });
      if (!updatedUser) {
         return res.status(400).json({message: 'Failed to update user'});
      }
      // Respond with success
      return res.status(200).json({
         message: 'User updated successfully',
         user: updatedUser,
      });
   } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({message: 'Internal server error'});
   }
};

exports.getProfileById = async (req, res) => {
   try {
      const userId = req.params.id;
      // Find the user by ID
      const user = await User.findById(userId).select('-password');
      if (!user) {
         return res.status(404).json({message: 'User not found'});
      }
      // Respond with user profile
      return res.status(200).json({
         message: 'User profile fetched successfully',
         user: user,
      });
   } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({message: 'Internal server error'});
   }
};

exports.logout = async (req, res) => {
   try {
      // Clear the cookie
      res.clearCookie('token', cookieOptions);
      // Respond with success
      return res.status(200).json({message: 'Logout successful'});
   } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({message: 'Internal server error'});
   }
};

exports.findUser = async (req, res) => {
   try {
      const {query} = req.query;
      if (!query) {
         return res
            .status(400)
            .json({message: 'Name query parameter is required'});
      }
      const users = await User.find({
         $and: [
            {_id: {$ne: req.user._id}},
            {
               $or: [
                  {name: {$regex: new RegExp(`^${query}`, 'i')}},
                  {email: {$regex: new RegExp(`^${query}`, 'i')}},
               ],
            },
         ],
      });
      if (users.length === 0) {
         return res.status(404).json({message: 'No users found'});
      }
      // Respond with the list of users
      return res.status(200).json({
         message: 'Users found successfully',
         users: users,
      });
   } catch (error) {
      console.error('Error finding users:', error);
      res.status(500).json({message: 'Internal server error'});
   }
};

exports.sendConnectionRequest = async (req, res) => {
   try {
      const sender = req.user._id;
      const {receiver} = req.body;

      if (!receiver) {
         return res.status(400).json({message: 'Receiver ID is required'});
      }

      // Check if receiver exists
      const userExist = await User.findById(receiver);
      if (!userExist) {
         return res.status(404).json({message: 'No such user found'});
      }

      // Fetch fresh sender user (in case req.user doesn't have .friends)
      const senderUser = await User.findById(sender);

      // Check if already friends
      const idx = senderUser.friends.findIndex(
         (id) => id && id.equals(receiver)
      );
      if (idx !== -1) {
         return res
            .status(400)
            .json({message: 'Already connected with this user'});
      }

      // Check if request already sent
      const lastidx = userExist.pending_friends.findIndex(
         (id) => id && id.equals(sender)
      );
      if (lastidx !== -1) {
         return res
            .status(400)
            .json({message: 'Connection request already sent'});
      }

      // Add sender to receiver's pending friends
      userExist.pending_friends.push(sender);

      const notification = new NotificationModel({
         sender: sender,
         receiver: receiver,
         type: 'connectionRequest',
         content: `You have a new connection request from ${req.user.f_name}`,
      });
      await notification.save();
      await userExist.save();

      return res.status(200).json({
         message: 'Connection request sent successfully',
         userId: userExist._id,
      });
   } catch (error) {
      console.error('Error sending connection request:', error);
      res.status(500).json({message: 'Internal server error'});
   }
};

exports.acceptConnectionRequest = async (req, res) => {
   try {
      const {sender} = req.body;
      const receiver = req.user._id;

      if (!sender) {
         return res.status(400).json({message: 'Sender ID is required'});
      }

      const userExist = await User.findById(sender);
      if (!userExist) {
         return res.status(404).json({message: 'No such user found'});
      }

      const receiverUser = await User.findById(receiver);

      const idx = receiverUser.friends.findIndex(
         (id) => id && id.equals(sender)
      );
      if (idx !== -1) {
         return res
            .status(400)
            .json({message: 'Already connected with this user'});
      }

      const lastidx = receiverUser.pending_friends.findIndex(
         (id) => id && id.equals(sender)
      );
      if (lastidx === -1) {
         return res.status(400).json({
            message: 'No connection request found from this user',
         });
      }

      receiverUser.friends.push(sender);
      userExist.friends.push(receiver);

      receiverUser.pending_friends.splice(lastidx, 1);

      const content = `Your connection request to ${receiverUser.f_name} has been accepted`;
      const notification = new NotificationModel({
         sender: receiver,
         receiver: sender,
         type: 'connectionRequest',
         content: content,
      });
      await notification.save();

      await receiverUser.save();
      await userExist.save();

      return res.status(200).json({
         message: 'Connection request accepted successfully',
         userId: userExist._id,
         friendId: receiverUser._id,
      });
   } catch (error) {
      console.error('Error accepting connection request:', error);
      res.status(500).json({message: 'Internal server error'});
   }
};

exports.getConnections = async (req, res) => {
   try {
      let connections = await User.findById(req.user._id).populate(
         'friends',
         '-password'
      );

      if (!connections) {
         return res.status(404).json({message: 'User not found'});
      }

      if (!connections.friends || connections.friends.length === 0) {
         return res.status(404).json({message: 'No connections found'});
      }

      return res.status(200).json({
         message: 'Connections fetched successfully',
         connections: connections.friends,
      });
   } catch (error) {
      console.error('Error fetching connections:', error);
      res.status(500).json({message: 'Internal server error'});
   }
};

exports.getPendingConnections = async (req, res) => {
   try {
      const user = await User.findById(req.user._id).populate(
         'pending_friends',
         '-password'
      );
      if (!user) {
         return res.status(404).json({message: 'User not found'});
      }
      if (!user.pending_friends || user.pending_friends.length === 0) {
         return res.status(404).json({message: 'No pending connections found'});
      }
      return res.status(200).json({
         message: 'Pending connections fetched successfully',
         pendingConnections: user.pending_friends,
      });
   } catch (error) {
      console.error('Error fetching pending connections:', error);
      res.status(500).json({message: 'Internal server error'});
   }
};

exports.removeConnection = async (req, res) => {
   try {
      const {connectionId} = req.params;
      const userId = req.user._id;

      if (!connectionId) {
         return res.status(400).json({message: 'Connection ID is required'});
      }

      const connectionUser = await User.findById(connectionId);
      if (!connectionUser) {
         return res.status(404).json({message: 'connectionUser not found'});
      }

      // Remove connectionId from user's friends
      const connectionIndex = req.user.friends.findIndex((id) =>
         id.equals(connectionId)
      );
      if (connectionIndex !== -1) {
         req.user.friends.splice(connectionIndex, 1);
      }

      // Remove userId from connectionUser's friends
      const userIndex = connectionUser.friends.findIndex((id) =>
         id.equals(userId)
      );
      if (userIndex !== -1) {
         connectionUser.friends.splice(userIndex, 1);
      }

      // Save both users
      await req.user.save();
      await connectionUser.save();
      // Respond with success
      return res.status(200).json({
         message: 'Connection removed successfully',
         userId: req.user._id,
         connectionId: connectionUser._id,
      });
   } catch (error) {
      console.error('Error removing connection:', error);
      res.status(500).json({message: 'Internal server error'});
   }
};
