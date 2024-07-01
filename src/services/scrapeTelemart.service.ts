import { ItemData } from "../types/itemData.interface";
import { Source } from "../types/source.enum";
import { SpecificationsData } from "../types/specificationsData.interface";
const cheerio = require("cheerio");

const scrapeTelemart = (html: string): ItemData => {
  const $ = cheerio.load(html);

  const title = $(".card-block__title").text();
  const description = $(".card-block__description-text").text();
  const price = parseInt(
    $(".card-block__price-summ").text().replace(/\s/g, "")
  );
  const type = $(".breadcrumb-ins>li").last().prev().find("a").text().trim();

  const profileImage = $(".card-block__gallery-main .img-fluid").attr("src");
  const source = Source.Telemart;

  // specifications
  const specifications: SpecificationsData[] = [];
  $(".card-block__specific-table .card-block__specific-row").each(
    (index: number, element: any) => {
      const label = $(element)
        .find(".card-block__specific-col:first-child")
        .text()
        .trim();
      const values = $(element)
        .find(".card-block__specific-col:last-child")
        .text()
        .trim()
        .replace(/\s+/g, " ");
      specifications.push({ label, value: values });
    }
  );
  let specificationStr = "";
  specifications.map(
    (item) => (specificationStr += `${item.label}: ${item.value} \n`)
  );

  const result: ItemData = {
    title,
    subtitle: null,
    description,
    price,
    specifications: specificationStr,
    type,
    profileImage,
    source,
  };

  return result;
};

module.exports = scrapeTelemart;
