const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(
    `mongodb+srv://priyanshu402muz:${process.env.DATABASE_PASSWORD}@cluster0.nuiojwu.mongodb.net/Linkedin-backend` // Replace testDB with your DB name
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
