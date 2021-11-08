import { Component, OnInit } from '@angular/core';
import {InvoiceService} from "../../services/invoice.service";
import {NgForm} from "@angular/forms";
import {Role} from "../../entities/role";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  data: string[] = [];
  name: string = "";
  permissions: string[] = [];
  selected: string[] = [];

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.getPermissions();
  }

  addRole(name: string, permissions: string[]): void {
    this.invoiceService.addRole({ name, permissions } as Role)
  }

  getPermissions(): void {
    this.invoiceService.getPermissions()
      .subscribe(permissions => {
        this.data = permissions
        this.selected = this.data
      });
  }

  submit(form: NgForm){
    console.log(form.value.name, form.value.permissions)
    this.addRole(form.value.name, form.value.permissions);
  }

}
