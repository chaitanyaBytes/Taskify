import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  userTodos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todos",
    },
  ],
});

const User = model("User", userSchema);

export default User;
