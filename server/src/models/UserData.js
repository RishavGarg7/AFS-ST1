import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    otp: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", User);
