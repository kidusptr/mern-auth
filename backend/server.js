import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(PORT, () => {
  connectDB();
  console.log("Server started on port " + PORT);
});
