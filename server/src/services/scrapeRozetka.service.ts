import { ItemData } from "../types/itemData.interface";
import { Source } from "../types/source.enum";
import { SpecificationsData } from "../types/specificationsData.interface";
import cheerio from "cheerio";

const scrapeRozetka = (html: string): ItemData => {
  const $ = cheerio.load(html);
  const maxDescriptionLength = process.env.DESCRIPTION_MAX_LENGTH
    ? parseInt(process.env.DESCRIPTION_MAX_LENGTH, 10)
    : 2048;
  const maxSpecificationLength = process.env.SPECIFICATION_MAX_LENGTH
    ? parseInt(process.env.SPECIFICATION_MAX_LENGTH, 10)
    : 2048;

  const title = $("h1").text();
  const subtitle = $(".product-about__sticky > p.ng-star-inserted").text();
  let description = $(".product-about__description-content")?.text().trim();
  const price = parseInt(
    $(".product-price__big").text().replace(/\s/g, "").slice(0, -1),
    10
  );

  if (description.length > maxDescriptionLength) {
    description = description.substring(0, maxDescriptionLength - 3) + "...";
  }

  const type = $("ul.breadcrumbs > li")
    .last()
    .prev()
    .find("span")
    .text()
    .trim()
    .replace("/", "");
  const profileImage = $(".picture-container__picture").attr("src");
  const source = Source.ROZETKA;

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
  specifications.forEach((item) => {
    specificationStr += `${item.label}: ${item.value} \n`;
  });

  if (specificationStr.length > maxSpecificationLength) {
    specificationStr =
      specificationStr.substring(0, maxSpecificationLength - 3) + "...";
  }

  const result: ItemData = {
    title,
    subtitle: subtitle === "" ? null : subtitle,
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
