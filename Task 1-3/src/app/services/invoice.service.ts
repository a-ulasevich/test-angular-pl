import {Injectable} from '@angular/core';
import {Invoice} from "../models/invoice";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invokeInvoiceSource = new Subject<void>();
  invokeInvoice$ = this.invokeInvoiceSource.asObservable();
  private invoicesUrl = 'api/invoices';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  addInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.invoicesUrl, invoice, this.httpOptions);
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.invoicesUrl);
  }
}
