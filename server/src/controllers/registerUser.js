import User from "../models/UserData.js";
import bcrypt from "bcrypt";
import { generateOTP, sendMail } from "./generateOTP.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashpsw = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const response = await User.create({
      username,
      email,
      password: hashpsw,
      otp,
    });
    sendMail(email, otp);
    res.status(200).json({
      success: true,
      data: response,
      message: "User Registered Successfully",
      isVerified: true,
    });
  } catch (error) {
    console.log("ERROR: While User Registeration", error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal Server Error Occured!!",
    });
  }
};

export default registerUser;
