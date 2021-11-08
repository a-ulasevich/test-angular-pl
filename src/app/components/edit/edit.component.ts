import {Component, Inject, OnInit} from '@angular/core';
import {Seller} from "../../entities/seller";
import {InvoiceService} from "../../services/invoice.service";
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NgxPermissionsService} from "ngx-permissions";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Seller, private invoiceService: InvoiceService, private ngxPermissionsService: NgxPermissionsService) {}

  ngOnInit() {
    this.invoiceService.getRole()
      .subscribe((role) => {this.role = role})
    this.ngxPermissionsService.loadPermissions(this.role)
  }
  id: number = this.data.id;
  name: string = this.data.name
  address: string = this.data.address;
  role: string[] = [''];

  updateSeller(id: number, name: string, address: string): void {
    this.invoiceService.updateSeller({ id, name, address } as Seller)
      .subscribe(() => { this.invoiceService.invokeSellerSource.next()})
  }

  submit(form: NgForm){
    console.log(this.data.id, form.value.name, form.value.address)
    this.updateSeller(this.data.id, form.value.name, form.value.address);
  }
}
