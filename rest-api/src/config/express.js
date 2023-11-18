import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authMiddleware from "../middlewares/auth.middleware.js";

const whitelist = ["http://localhost:5000", "http://localhost:4200"];

const epxressConfig = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    cors({
      origin: whitelist,
      credentials: true,
    })
  );
  app.use(authMiddleware());
};

export default epxressConfig;
