import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server started on port " + PORT);
});
