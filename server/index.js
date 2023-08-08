import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

// routes
import AuthRoute from "./src/routes/AuthRoute.js";
import UserRoute from "./src/routes/UserRoute.js";
import ChatRoute from "./src/routes/ChatRoute.js";
import MessageRoute from "./src/routes/MessageRoute.js";
import { configSocket } from "./src/socket/socket.js";

dotenv.config();
const PORT = process.env.PORT;
const CONNECTION = process.env.MONGODB_CONNECTION;
const app = express();

app.use(cors());

global.activeUsers = [];

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.static("public"));
app.use("/images", express.static("images"));

mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const server = http.createServer(app);
    const io = configSocket(server);

    // Configure socket.io
    io.on("connection", (socket) => {
      console.log(`Socket connected: ${socket.id}`);
      // You can add your socket event listeners and logic here
    });
  })
  .catch((error) => console.log(`${error} did not connect`));

app.use((req, res, next) => {
  res.locals.io = io; // Make io available to routes
  next();
});

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
