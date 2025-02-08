const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const message = express.Router();

// Middleware to parse URL-encoded and JSON data
message.use(express.urlencoded({ extended: true }));
message.use(express.json());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.USER, // Your Gmail email address
    pass: process.env.PASS, // Your Gmail app password
  },
});

// Function to send email
const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

// Route to handle form submission and send email
message.post("/send", async (req, res) => {
  const data = req.body;

  // Email content configuration
  const mailOptions = {
    from: {
      name: "Portfolio Contact Form", // Sender name
      address: "contactminatech@gmail.com",
    },
    to: "alazar.damena7@gmail.com", // Your email address
    subject: "New Message from Portfolio Contact Form", // Email subject
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #0077b6;">New Message from Portfolio Contact Form</h2>
        <p>Hello Alazar,</p>
        <p>You have received a new message from your portfolio contact form:</p>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Name:</th>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.name}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Email:</th>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.email}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Location:</th>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.location}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Budget:</th>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.budget}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Subject:</th>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.subject}</td>
          </tr>
          <tr>
            <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Message:</th>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.message}</td>
          </tr>
        </table>
      </div>
    `,
  };

  try {
    // Send the email
    await sendMail(transporter, mailOptions);
    res.status(201).json({ message: `Email successfully sent to ${data.email}` });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ message: "Unable to send email. Please try again later." });
  }
});

module.exports = { message };