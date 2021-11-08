import { Injectable } from '@angular/core';
import {Seller} from "../entities/seller";
import {Invoice} from "../entities/invoice";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Role} from "../entities/role";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private invoicesUrl = 'api/invoices';
  private sellersUrl = 'api/sellers';
  private roleUrl = 'api/role';
  private rolesListUrl = 'api/rolesList';
  private permissionsUrl = 'api/permissions';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

  invokeInvoiceSource = new Subject<void>();
  invokeSellerSource = new Subject<void>()
  invokeInvoice$ = this.invokeInvoiceSource.asObservable();
  invokeSeller$ = this.invokeSellerSource.asObservable();

  addInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.invoicesUrl, invoice, this.httpOptions);
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.invoicesUrl);
  }

  getSellers(): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.sellersUrl)
  }

  updateSeller(seller: Seller): Observable<Seller> {
    return this.http.put<Seller>(this.sellersUrl, seller, this.httpOptions);
  }

  getRole(): Observable<Role> {
    return this.http.get<Role>(this.roleUrl);
  }

  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.rolesListUrl, role, this.httpOptions)
  }

  getPermissions(): Observable<string[]> {
    return this.http.get<string[]>(this.permissionsUrl);
  }
}
