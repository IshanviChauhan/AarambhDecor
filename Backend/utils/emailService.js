const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address from .env file
    pass: process.env.GMAIL_APP_PASSWORD, // Your App Password from .env file
  },
});

const sendEmail = async (email, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"Himtaj Jewelry" <${process.env.GMAIL_USER}>`,
      to: email,
      subject,
      text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendEmail };
