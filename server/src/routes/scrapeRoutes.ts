import express from "express";
const scrapController = require("../controllers/scrapeController");

const router = express.Router();

router.route("/").post(scrapController.scrape).get(scrapController.getAllItems);
router.route("/:id").get(scrapController.getItem);

module.exports = router;
