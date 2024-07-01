import { ItemData } from "../types/itemData.interface";
import { Source } from "../types/source.enum";
import { SpecificationsData } from "../types/specificationsData.interface";

const cheerio = require("cheerio");

const scrapeRozetka = (html: string): ItemData => {
  const $ = cheerio.load(html);

  const title = $("h1").text();
  const subtitle = $(".product-about__sticky > p.ng-star-inserted").text();
  const description = $(".product-about__description-content").text();
  const price = parseInt(
    $(".product-price__big").text().slice(0, -1).replace(/\s/g, "")
  );

  const type = $("ul.breadcrumbs > li")
    .last()
    .prev()
    .find("span")
    .text()
    .trim()
    .replace("/", "");
  const profileImage = $(".picture-container__picture").attr("src");
  const source = Source.Rozetka;

  // specifications
  const specifications: SpecificationsData[] = [];
  $("dl.list .item").each((index: number, element: any) => {
    const label: string = $(element).find("dt.label span").text().trim();
    const values = $(element)
      .find("dd.value li, dd.value span")
      .text()
      .trim()
      .replace(/\s+/g, " ");
    specifications.push({ label, value: values });
  });

  let specificationStr = "";
  specifications.map(
    (item) => (specificationStr += `${item.label}: ${item.value} \n`)
  );

  const result: ItemData = {
    title,
    subtitle,
    description,
    price,
    specifications: specificationStr,
    type,
    profileImage,
    source,
  };

  return result;
};

module.exports = scrapeRozetka;
