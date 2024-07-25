import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection_string = "mongodb+srv://chaitanyagupta172004:ghannugupta@cluster0.espvczu.mongodb.net/Taskify?retryWrites=true&w=majority&appName=Cluster0";

export default async function dbConnect() {
  try {
    if (connection_string) {
      const connection = await connect(connection_string);
      console.log(`mongodb connected: ${connection.connection.host}`);
    } else {
      console.log("MongoDB connection string is not defined");
    }
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}
