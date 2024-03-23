import express from "express";
const router = express.Router();
import registerUser from "../controllers/registerUser.js";
import loginUser from "../controllers/loginUser.js";
import otpVerify from "../controllers/otpVerify.js";

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/verify/:otp/:email", otpVerify);

export default router;
