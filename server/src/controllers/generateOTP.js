import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const generateOTP = () => {
  var randomnum = Math.floor(Math.random() * 9000) + 1000;
  console.log(randomnum);
  return randomnum;
};
const sendMail = (email, otp) => {
  var transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSKEY,
    },
  });

  var mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: "Verify OTP",
    text: `Your OTP for Verification is : ${otp}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export { generateOTP, sendMail };
