import express from "express";
import mongoose from "mongoose";
import { app } from "./app";

import config from "./config";

const start = async () => {
  const server = require("http").createServer(app);
  try {
    const mongodb = config.app.mongoUrl;
    mongoose.set("strictQuery", true);
    await mongoose.connect(mongodb).then((res) => {
      console.log("Connected to mongoDb sucessfully");
    });
  } catch (e) {
    console.log("ERROR :", e);
  }

  server.listen(config.app.port, () => {
    console.log(
      `server sttarted at port: http://${config.app.host}:${config.app.port}`
    );
  });
};
start();
