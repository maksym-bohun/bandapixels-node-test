import { Connection } from "mongoose";
import app from "./app";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = (process.env.DATABASE || "").replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD || ""
);

console.log(DB);
mongoose
  .connect(DB)
  .then((con: Connection) => console.log("DB connection successful!"))
  .catch((err: Error) => console.log("ERROR", err));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
