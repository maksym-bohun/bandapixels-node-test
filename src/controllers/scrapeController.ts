import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
const axios = require("axios");
const scrapeRozetka = require("../services/scrapeRozetka.service");
const scrapeTelemart = require("../services/scrapeTelemart.service");

exports.scrape = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { url } = req.body;

    const response = await axios.get(url);
    const html = response.data;

    if (url.startsWith("https://rozetka.com")) {
      const result = scrapeRozetka(html);
      res.json({ result });
    } else if (url.startsWith("https://telemart.ua")) {
      const result = scrapeTelemart(html);
      res.json({ result });
    } else {
      res.send("Error");
    }
  }
);
