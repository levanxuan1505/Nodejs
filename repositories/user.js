import { print, OutputType } from "../helpers/print.js";
import { User } from "../models/index.js";
import Exception from "../exceptions/Exception.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const login = async ({ email, password }) => {
  // print("login user in user repository", OutputType.INFORMATION);
  let existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    //not encrypt password
    let isMatch = await bcrypt.compare(password, existingUser.password);
    if (!!isMatch) {
      // create new token
      let token = jwt.sign(
        {
          data: existingUser,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30 days" }
      );
      // clone an add more property
      return {
        ...existingUser.toObject(),
        password: "Not show",
        token: token,
      };
    } else {
      throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);
  }
};
const register = async ({ email, password, name, phoneNumber, address }) => {
  // validate already registered
  // console.log("register", email, password, name, phoneNumber, address);

  debugger;
  const existingUser = await User.findOne({ email }).exec();
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXISTING);
  }
  // encrypt password
  // const isMatched = await bcrypt.compare(password, existingUser.password);
  // if (isMatched) {

  // }
  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    address,
  });
  return {
    ...newUser._doc,
    password: "Not show",
  };
};
export default { login, register };
