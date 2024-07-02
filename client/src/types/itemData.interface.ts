import { Source } from "./source.enum";

export interface ItemData {
  _id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  price: number;
  specifications: string;
  type: string;
  profileImage: string | undefined;
  source: Source;
}
