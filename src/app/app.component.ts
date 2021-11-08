import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {InvoiceService} from "./services/invoice.service";
import {NgxPermissionsService} from "ngx-permissions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public dialog: MatDialog,
              private invoiceService: InvoiceService,
              private ngxPermissionsService: NgxPermissionsService) {}

  ngOnInit() {
    this.invoiceService.getRole()
      .subscribe(role => {
        this.ngxPermissionsService.loadPermissions(role)
      })
  }
  title = 'angular-test';
}
