import User from "../models/UserData.js";
import bcrypt from "bcrypt";
import { generateOTP, sendMail } from "./generateOTP.js";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const response = await User.findOne({ email });
    console.log(response);
    if (response && await bcrypt.compare(password, response.password)) {
      const otp = generateOTP();
      await User.findOneAndUpdate({ email }, { otp });
      sendMail(email, otp);
      res.status(200).json({
        success: true,
        data: response,
        message: "User Login Successfully",
        isVerified: true,
      });
    } else {
      throw new Error("Invalid Email or Password!!");
    }
  } catch (error) {
    console.log("ERROR: While User Login", error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal Server Error Occured!!",
    });
  }
};

export default loginUser;
