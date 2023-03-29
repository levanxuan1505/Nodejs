import mongoose from "mongoose";
import Exception from "../exceptions/Exception.js";
import { print, OutputType } from "../helpers/print.js";
async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    print("connect mongoose successfully", OutputType.SUCCESS);
    return connection;
  } catch (error) {
    const { code } = error;
    if (code === 8000) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (code === "ENOTFOUND") {
      throw new Exception(Exception.WRONG_CONNECTION_STRING);
    }
    throw new Exception(Exception.CAN_NOT_CONNECT_MONGODB);
  }
}
export default connect;
