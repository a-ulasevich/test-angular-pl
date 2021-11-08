import {Component, Inject, OnInit} from '@angular/core';
import {Seller} from "../../models/seller";
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SellerService} from "../../services/seller.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number = this.data.id;
  name: string = this.data.name
  address: string = this.data.address;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Seller, private sellerService: SellerService) {
  }

  ngOnInit() {
  }

  updateSeller(id: number, name: string, address: string): void {
    this.sellerService.updateSeller({id, name, address} as Seller)
  }

  submit(form: NgForm) {
    console.log(this.data.id, form.value.name, form.value.address)
    this.updateSeller(this.data.id, form.value.name, form.value.address);
  }
}
