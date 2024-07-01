import { Source } from "./source.enum";
import { SpecificationsData } from "./specificationsData.interface";

export interface ItemData {
  title: string;
  subtitle: string | null;
  description: string | null;
  price: number;
  specifications: string;
  type: string;
  profileImage: string;
  source: Source;
}
