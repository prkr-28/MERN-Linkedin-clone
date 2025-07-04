const express = require('express');
require('./connection'); // Ensure this file exists and connects to MongoDB

const cookieParser = require('cookie-parser');

require('dotenv').config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());

const userRouter = require('./routes/user');
app.use('/api/auth', userRouter);

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
