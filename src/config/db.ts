import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // this line charges the environment vars contained in the folder env

const conectionString = process.env.MONGO_URL || "default"; // this line gets the environment var MONGO_URL or sets a default value

/**
 * This function connects to the mongo database and returns a promise
 */
export const db = mongoose
  .connect(conectionString)
  .then(() => console.log("Connected to MONGO DB!"))
  .catch((err) => console.error(err));

export default db;
