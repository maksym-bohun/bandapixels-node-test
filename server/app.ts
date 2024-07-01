const express = require("express");
import { Request, Response, NextFunction } from "express";
const cors = require("cors");
const AppError = require("./src/utils/appError");
const Item = require("./src/models/itemModel");
const scrapeRoute = require("./src/routes/scrapeRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/", scrapeRoute);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

export default app;
