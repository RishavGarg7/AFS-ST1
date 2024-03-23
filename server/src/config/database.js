import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=>{
    console.log("Connection With Database is Successful!!");
  })
  .catch((error)=>{
    console.log("ERROR: While Databse Connecting",error);
    process.exit(1);
  })
};

export default dbConnect;