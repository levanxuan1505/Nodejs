import { ObjectId, Schema } from "mongoose";
import mongoose from "mongoose";
const Klass = mongoose.model(
  "Klass",
  new Schema({
    id: { type: ObjectId },
    name: {
      type: String,
      required: true,
      validate: {
        validator: () => this.name.length > 3,
        message: "Class name must be at least 4 characters long",
      },
    },
  })
);
export default Klass;
