"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TodoSchema = new mongoose_1.Schema({
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
const Todo = (0, mongoose_1.model)("Todos", TodoSchema);
exports.default = Todo;
