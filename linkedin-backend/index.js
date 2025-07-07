const express = require('express');
require('./connection'); // Ensure this file exists and connects to MongoDB

const cors = require('cors');

const cookieParser = require('cookie-parser');

require('dotenv').config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
   cors({
      origin: 'http://localhost:5173',
      credentials: true, // Allow cookies to be sent with requests
   })
);

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const notificationRouter = require('./routes/notification');
const commentRouter = require('./routes/comment');
const conversationRouter = require('./routes/conversation');
const messageRouter = require('./routes/message');

app.use('/api/auth', userRouter);
app.use('/api/post', postRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/comment', commentRouter);
app.use('/api/conversation', conversationRouter);
app.use('/api/message', messageRouter);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
