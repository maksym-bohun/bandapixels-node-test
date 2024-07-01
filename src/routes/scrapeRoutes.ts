import express, { Request, Response } from "express";
const scrapController = require("../controllers/scrapeController");

const router = express.Router();

router.route("/").post(scrapController.scrape);

module.exports = router;
