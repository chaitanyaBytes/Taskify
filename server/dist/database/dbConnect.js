"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dbConnect;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const connection_string = "mongodb+srv://chaitanyagupta172004:ghannugupta@cluster0.espvczu.mongodb.net/Taskify?retryWrites=true&w=majority&appName=Cluster0";
const connection_string = "mongodb://localhost:27017/TodoList";
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (connection_string) {
                const connection = yield (0, mongoose_1.connect)(connection_string);
                console.log(`mongodb connected: ${connection.connection.host}`);
            }
            else {
                console.log("MongoDB connection string is not defined");
            }
        }
        catch (e) {
            console.log(`Error: ${e}`);
        }
    });
}
