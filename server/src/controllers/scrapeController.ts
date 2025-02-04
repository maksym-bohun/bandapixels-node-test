import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
const Item = require("../models/itemModel");
const axios = require("axios");
const scrapeRozetka = require("../services/scrapeRozetka.service");
const scrapeTelemart = require("../services/scrapeTelemart.service");

exports.scrape = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { url } = req.body;

    const response = await axios.get(url);
    const html = response.data;

    if (url.startsWith("https://rozetka.com")) {
      const item = scrapeRozetka(html);
      await Item.create({ ...item, itemUrl: url });
      res.json({ item });
    } else if (url.startsWith("https://telemart.ua")) {
      const item = scrapeTelemart(html);
      await Item.create({ ...item, itemUrl: url });
      res.json({ item });
    } else {
      res.send("Error");
    }
  }
);

exports.getAllItems = catchAsync(async (req: Request, res: Response) => {
  const items = await Item.find();
  res.status(200).json({ items });
});

exports.getItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await Item.findOne({ _id: id });
  res.status(200).json({ item });
});
