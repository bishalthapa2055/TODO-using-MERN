import * as dotenv from "dotenv";

dotenv.config();

const config = {
  app: {
    mongoUrl:
      process.env.MONGO_URI! ||
      process.env.MONGO_CONNECTION_STRING ||
      "mongodb://localhost:27017/nimbuzzTodo",
    host: process.env.APP_HOST || "localhost",

    port: process.env.PORT || 5555,
  },
};

export default config;
