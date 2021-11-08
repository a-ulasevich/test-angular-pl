import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Seller} from "../entities/seller";
import {Invoice} from "../entities/invoice";
import {Role} from "../entities/role";

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const sellers: Seller[] = [
      {id: 1, name: "Kathleen Smith", address: "18257 Center Ave, Homewood, IL, 60430"},
      {id: 2, name: "April Johnson", address: "192 Fisherman St, Opa Locka, FL, 33054 "},
      {id: 3, name: "Gale Thompson", address: "40429 Trotter Ln, Dade City, FL, 33525"},
      {id: 4, name: "Brenda Harris", address: "25246 S Tryon St, Channahon, IL, 60410"},
      {id: 5, name: "Herbert Ritchie", address: "704 Southwick Apts, Southern Pines, NC, 28387"},
    ];
    const invoices: Invoice[] = [
      {id: 1, date: "2021-10-01", seller: sellers[0], amount: 1000},
      {id: 2, date: "2021-09-10", seller: sellers[1], amount: 4200},
      {id: 3, date: "2021-03-05", seller: sellers[2], amount: 350},
      {id: 4, date: "2021-05-31", seller: sellers[3], amount: 840},
      {id: 5, date: "2021-10-22", seller: sellers[4], amount: 14140}
    ];

    const permissions: string[] = [
      "add",
      "edit"
    ];

    const rolesList: Role[] = [
      {id: 1, name: "ADMIN", permissions: [permissions[0], permissions[1]]},
      {id: 2, name: "GUEST", permissions: []}
    ];

    const role: Role = rolesList[1];

    return {invoices, sellers, rolesList, role, permissions};
  }
}
