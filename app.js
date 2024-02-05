// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors middleware

const app = express();

app.use(express.json());
app.use(cors()); // Use the cors middleware for all routes
require( 'dotenv' ).config();

const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
const port = process.env.PORT || 3000;
const debugMode = process.env.DEBUG === 'true';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

app.post('/send-email', async (req, res) => {
  const mailOptions = {
    from: emailUser,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text, 
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
