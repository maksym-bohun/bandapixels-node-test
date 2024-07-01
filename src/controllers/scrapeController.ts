import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
const axios = require("axios");
const scrapeRozetka = require("../services/scrapeRozetka.service");

exports.scrape = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { url } = req.body;

    if (url.startsWith("https://rozetka.com")) {
      const response = await axios.get(url);
      const html = response.data;
      const result = scrapeRozetka(html);
      res.json({ result });
    } else {
      res.send("Error");
    }
  }
);
