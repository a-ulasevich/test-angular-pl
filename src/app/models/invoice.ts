import {Seller} from "./seller";

export interface Invoice {
  id: number;
  date: string;
  seller: Seller;
  amount: number;
}
