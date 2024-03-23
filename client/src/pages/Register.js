import React, { useState, useEffect } from "react";
import "../utils/Style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

async function getUser(username, email, password, setError, setErrMsg) {
  try {
    const response = await axios.post("http://localhost:8000/register", {
      username: username,
      email: email,
      password: password,
    });
    console.log(response.data);
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
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    setError(true);
    setErrMsg(error.response.data.error);
  }
}

function Register() {
  const navigate = useNavigate();
  const [uname, setUsername] = useState("");
  const [eml, setEmail] = useState("");
  const [psw, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [err, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("ERROR: Something Went Wrong");
  useEffect(() => {
    document.title = "Register";
  }, []);
  const [isVerified, setIsVerified] = useState(false);
  return (
    <div className="outerContainer2">
      <div className="container">
        <form action="">
          <h1>Welcome to Cluster</h1>
          <label htmlFor="">Username</label>
          <input
            type="text"
            value={uname}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Username"
          />
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
              Register
            </button>
          ) : (
            <button
              // type="submit"
              onClick={async (e) => {
                e.preventDefault();
                if (uname === "" || eml === "" || psw === "") {
                  setError(true);
                  setErrMsg("Please fill all the fields!!");
                } else {
                  const res = await getUser(
                    uname,
                    eml,
                    psw,
                    setError,
                    setErrMsg
                  );
                  if (res && res.isVerified === true) {
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
            Already with us?{" "}
            <Link to="/login">
              <span>Login Now</span>
            </Link>{" "}
          </p>
        </form>
        <div className="side-image2"></div>
      </div>
    </div>
  );
}

export default Register;
