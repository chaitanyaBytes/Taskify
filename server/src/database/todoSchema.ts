import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
    default: false,
  },
  dueDate: {
    type: Date,
  },
});

const Todo = model("Todos", TodoSchema);
export default Todo;
