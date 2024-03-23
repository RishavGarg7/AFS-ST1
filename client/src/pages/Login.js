import React, { useState, useEffect } from "react";
import "../utils/Style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

async function getUser(email, password, setError, setErrMsg) {
  try {
    const response = await axios.post("http://localhost:8000/login", {
      email: email,
      password: password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    setError(true);
    setErrMsg(error.response.data.error);
  }
}
async function VerifyOtp(email, otp, setError, setErrMsg) {
  try {
    const response = await axios.get(
      `http://localhost:8000/verify/${otp}/${email}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    setError(true);
    setErrMsg(error.response.data.error);
  }
}

function Login() {
  const navigate = useNavigate();
  const [eml, setEmail] = useState("");
  const [psw, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [err, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("ERROR: Something Went Wrong");
  useEffect(() => {
    document.title = "Login";
  }, []);
  const [isVerified, setIsVerified] = useState(false);
  return (
    <div className="outerContainer">
      <div className="container">
        <div className="side-image"></div>
        <form action="">
          <h1>Welcome Back</h1>
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={eml}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="abc@gmail.com"
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={psw}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="***********"
          />
          {isVerified ? (
            <>
              <label htmlFor="">OTP Here</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                placeholder="123456"
              />
            </>
          ) : (
            <div></div>
          )}
          {isVerified ? (
            <button
              onClick={async (e) => {
                e.preventDefault();
                const res = await VerifyOtp(eml, otp, setError, setErrMsg);
                if (res && res.isVerifiedCompletely) {
                  navigate("/");
                }
              }}
            >
              Login
            </button>
          ) : (
            <button
              onClick={async (e) => {
                e.preventDefault();
                if (eml === "" || psw === "") {
                  setError(true);
                  setErrMsg("Please fill all the fields!!");
                } else {
                  const res = await getUser(eml, psw, setError, setErrMsg);
                  if (res && res.isVerified) {
                    setIsVerified(true);
                  }
                }
              }}
            >
              Send OTP
            </button>
          )}
          {err ? (
            <p
              style={{ marginBottom: "0px", color: "#ff1f1f", fontWeight: 600 }}
            >
              {errMsg}
            </p>
          ) : (
            <></>
          )}
          <p>
            New to our Platform?{" "}
            <Link to="/register">
              <span>Register Now</span>
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
