import User from "../models/UserData.js";
const otpVerify = async (req, res) => {
  try {
    const { otp, email } = req.params;
    const response = await User.findOne({ email });
    if (response.otp == otp) {
      res.status(200).json({
        success: true,
        message: "User Verification Successfully",
        isVerifiedCompletely: true,
      });
    } else {
      throw new Error("Wrong OTP!!");
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

export default otpVerify;
