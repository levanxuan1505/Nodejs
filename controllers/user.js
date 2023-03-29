import { body, validationResult } from "express-validator";
import { userRepository } from "../repositories/index.js";
import { EventEmitter } from "node:events";
import Exception from "../exceptions/Exception.js";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
const myEven = new EventEmitter();
//listen
myEven.on("even.register.user", (params) => {
  console.log(`they talk about ${JSON.stringify(params)}`);
});
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let existingUser = await userRepository.login({ email, password });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Login user successfully",
      data: existingUser,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const register = async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;
  myEven.emit("even.register.user", { email, phoneNumber });
  try {
    debugger;
    const user = await userRepository.register({
      name,
      email,
      password,
      phoneNumber,
      address,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Register user successfully",
      data: user,
    });
  } catch (exception) {
    debugger;
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};
const getDetailUser = (req, res) => {
  res.send("Get detail user");
};
export default { login, register, getDetailUser };
