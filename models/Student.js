import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
const Student = mongoose.model(
  "Student",
  new Schema(
    {
      id: { type: ObjectId },
      name: {
        type: String,
        required: true,
        validated: {
          validator: (value) => value.length > 3,
          message: "User name must be at least 3 characters",
        },
      },
      email: {
        type: String,
        required: true,
        validated: {
          validator: (value) => isEmail,
          message: "Email is incorrect format",
        },
      },
      languages: {
        type: [String],
      },
      gender: {
        type: String,
        enum: {
          values: ["Male", "Female"],
          message: "Gender must be Male or Female",
        },
      },
      phoneNumber: {
        type: String,
        required: true,
        validate: {
          validator: (phoneNumber) =>
            phoneNumber.length <= 50 && phoneNumber.length > 5,
          message: "Phone number must be at least 5 characters, max 20",
        },
      },
      address: {
        type: String,
        required: false,
      },
    },
    {
      autoCreate: false,
      autoIndex: true,
    }
  )
);
export default Student;
