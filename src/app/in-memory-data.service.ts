import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Seller} from "./entities/seller";
import {Invoice} from "./entities/invoice";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const sellers: Seller[] = [
      {id: 1, name: "Sergey Bodrov", address: "Minsk"},
      {id: 2, name: "Michael Jackson", address: "Toronto"},
      {id: 3, name: "Max Butler", address: "Washington"},
      {id: 4, name: "Edward Snowden", address: "Palo-Alto"},
      {id: 5, name: "Denzel Curry", address: "Kyiv"},
    ];
    const invoices: Invoice[] = [
      {id: 1, date: "2021-10-01", seller: sellers[0], amount: 1000},
      {id: 2, date: "2021-09-10", seller: sellers[1], amount: 4200},
      {id: 3, date: "2021-03-05", seller: sellers[2], amount: 350},
      {id: 4, date: "2021-05-31", seller: sellers[3], amount: 840},
      {id: 5, date: "2021-10-22", seller: sellers[4], amount: 14140}
    ];
    return {invoices, sellers};
  }
}
