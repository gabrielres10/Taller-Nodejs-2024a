import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // this line charges the environment vars contained in the folder env

const conectionString = process.env.MONGO_URL || "default";

export const db = mongoose.connect(conectionString).then(
    () => console.log("Connected to MONGO DB!")
).catch(
    (err) => console.error(err)
);

export default db;