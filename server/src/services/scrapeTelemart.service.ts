import { ItemData } from "../types/itemData.interface";
import { Source } from "../types/source.enum";
import { SpecificationsData } from "../types/specificationsData.interface";
const cheerio = require("cheerio");

const scrapeTelemart = (html: string): ItemData => {
  const $ = cheerio.load(html);
  const maxDescriptionLength = process.env.DESCRIPTION_MAX_LENGTH
    ? parseInt(process.env.DESCRIPTION_MAX_LENGTH, 10)
    : 2048;
  const maxSpecificationLength = process.env.SPECIFICATION_MAX_LENGTH
    ? parseInt(process.env.SPECIFICATION_MAX_LENGTH, 10)
    : 2048;

  const title = $(".card-block__title").text();
  let description = $(".card-block__description-text")?.text().trim() || null;
  const price = parseInt(
    $(".card-block__price-summ").text().replace(/\s/g, "")
  );
  const type = $(".breadcrumb-ins>li").last().prev().find("a").text().trim();

  const profileImage = $(".card-block__gallery-main .img-fluid").attr("src");
  const source = Source.TELEMART;

  if (description?.length > maxDescriptionLength) {
    description = description.substring(0, maxDescriptionLength - 3) + "...";
  }

  // specifications
  const specifications: SpecificationsData[] = [];
  $(".card-block__specific-table .card-block__specific-row").each(
    (index: number, element: any) => {
      const label = $(element)
        .find(".card-block__specific-col:first-child")
        .text()
        .trim();
      const htmlContent = $(element)
        .find(".card-block__specific-col:last-child")
        .html();
      const processedHtml = htmlContent.replace(/<br\s*\/?>/gi, ", ");

      const values = $("<div>")
        .html(processedHtml)
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
  if (specificationStr.length > maxSpecificationLength) {
    specificationStr =
      specificationStr.substring(0, maxSpecificationLength - 3) + "...";
  }

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
