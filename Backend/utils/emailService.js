const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ishanvi.chauhan@gmail.com", // Your Gmail address
    pass: "xwyn uwez wjpp gyil",       // Replace with your App Password
  },
});

const sendEmail = async (email, subject, text) => {
  try {
    await transporter.sendMail({
      from: '"Your App Name" <ishanvi.chauhan@gmail.com>',
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
