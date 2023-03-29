import express from "express";
import * as dotenv from "dotenv";
import { userRouter, studentRouter } from "./routers/index.js";
import checkToken from "./authentication/auth.js";
dotenv.config();
import connect from "./database/database.js";
const app = express();
app.use(checkToken);
app.use(express.json());
// routers
app.use("/users", userRouter);
app.use("/students", studentRouter);
// app.get("/", (req, res) => {
//   res.send("Hello world 2023");
// });
app.listen(process.env.PORT ?? 3000, async (req, res) => {
  await connect();
  console.log(`Server listening on ${process.env.PORT}`);
});
