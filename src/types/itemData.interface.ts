import { Source } from "./source.enum";

export interface ItemData {
  title: string;
  subtitle: string | null;
  description: string | null;
  price: number;
  specifications: string;
  type: string;
  profileImage: string | undefined;
  source: Source;
}
