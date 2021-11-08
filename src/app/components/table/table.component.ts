import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ThumbnailComponent} from "../thumbnail/thumbnail.component";
import {InvoiceService} from "../../services/invoice.service";
import {Invoice} from "../../entities/invoice";
import {Subscription} from "rxjs";
import {Seller} from "../../entities/seller";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  dataSource: Invoice[] = [];
  dataSourceFilter: Invoice[] = [];
  sellers: Seller[] = [];
  subscription: Subscription = new Subscription();
  filteredValue: Seller = {id: 0, name: "", address: ""};
  constructor(public dialog: MatDialog, private invoiceService: InvoiceService) {
  }
  ngOnInit(){
    this.subscription = this.invoiceService.invokeInvoice$.subscribe(() => {
      this.getInvoices()
    })
    this.getInvoices();
    this.getSellers();
  }

  getInvoices(): void {
    this.invoiceService.getInvoices()
      .subscribe(invoices => {
        this.dataSource = invoices
        this.dataSourceFilter = invoices
      });
  }

  getSellers(): void {
    this.invoiceService.getSellers()
      .subscribe(sellers => this.sellers = sellers)
  }

  openDialog(data: Invoice) {
    this.dialog.open(ThumbnailComponent, {data});
  }

  applyFilter() {

    if (this.filteredValue !== undefined)
    {
      this.dataSource = this.dataSourceFilter.filter(invoice => invoice.seller.id === this.filteredValue.id)
    }
    else {
      this.getInvoices()
    }
  }

  displayedColumns: string[] = ['id', 'name', 'amount'];

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
