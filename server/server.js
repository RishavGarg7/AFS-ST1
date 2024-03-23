import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./src/config/database.js";
import user from "./src/routes/user.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/", user);

app.listen(process.env.PORT, () => {
  console.log(`Server is Started At PORT: ${process.env.PORT}`);
  return "Hello";
});

dbConnect();
