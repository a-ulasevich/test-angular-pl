import {Component, Inject, OnInit} from '@angular/core';
import {InvoiceService} from "../../services/invoice.service";
import {Seller} from "../../entities/seller";
import {NgForm} from "@angular/forms";
import {Invoice} from "../../entities/invoice";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {

  data: Seller[] = [];
  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.getSellers();
  }

  id: number = 0;
  date: string = "";
  seller: Seller = {id: 0, name: "", address: ""};
  amount: number = 0;
  element: object = {};

  addInvoice(id: number, date: string, seller: Seller, amount: number): void {
    this.invoiceService.addInvoice({ id, date, seller, amount } as Invoice)
      .subscribe(() => { this.invoiceService.invokeInvoiceSource.next()})
  }

  getSellers(): void {
    this.invoiceService.getSellers()
      .subscribe(sellers => this.data = sellers);
  }

  submit(form: NgForm){
    this.addInvoice(form.value.id, form.value.date, form.value.seller, form.value.amount);
  }
}
