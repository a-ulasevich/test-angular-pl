import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ThumbnailComponent} from "../thumbnail/thumbnail.component";
import {InvoiceService} from "../../services/invoice.service";
import {Invoice} from "../../models/invoice";
import {Subscription} from "rxjs";
import {Seller} from "../../models/seller";
import {SellerService} from "../../services/seller.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];
  sellers: Seller[] = [];
  subscription: Subscription = new Subscription();
  filteredValue?: Seller;
  displayedColumns: string[] = ['id', 'name', 'amount'];

  constructor(private dialog: MatDialog, private invoiceService: InvoiceService, private sellerService: SellerService) {
  }

  ngOnInit() {
    this.subscription = this.invoiceService.invokeInvoice$.subscribe(() => {
      this.getInvoices()
    })
    this.getInvoices();
    this.getSellers();
  }

  getInvoices(): void {
    this.invoiceService.getInvoices()
      .subscribe(invoices => {
        this.invoices = invoices
        this.filteredInvoices = invoices
      });
  }

  getSellers(): void {
    this.sellerService.getSellers()
      .subscribe(sellers => this.sellers = sellers)
  }

  openDialog(data: Invoice) {
    this.dialog.open(ThumbnailComponent, {data});
  }

  applyFilter() {
    this.filteredInvoices = this.filteredValue ? this.invoices.filter(invoice => invoice.seller.id === this.filteredValue?.id) : this.invoices
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
