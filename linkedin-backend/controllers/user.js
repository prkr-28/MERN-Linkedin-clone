const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cookieOptions = {
   httpOnly: true,
   secure: false, // set to true in production
   sameSite: 'Lax', // set to 'None'
};

exports.register = async (req, res) => {
   try {
      let {name, email, password} = req.body;

      if (!name || !email || !password) {
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
         name: name,
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
         .json({message: 'Login successful', userId: user._id});
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
         userId: user._id,
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
      const updatedUser = await User.findByIdAndUpdate(userexists._id, user);
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
