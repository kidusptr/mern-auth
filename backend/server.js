import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  connectDB();
  console.log("Server started on port 3000");
});
