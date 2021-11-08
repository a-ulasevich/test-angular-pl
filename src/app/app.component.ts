import {Component, OnInit, Renderer2, ViewChildrenDecorator} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {InvoiceService} from "./services/invoice.service";
import {NgxPermissionsConfigurationService, NgxPermissionsService, NgxRolesService} from "ngx-permissions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public dialog: MatDialog,
              private renderer: Renderer2,
              private invoiceService: InvoiceService,
              private ngxPermissionsService: NgxPermissionsService,
              private ngxRolesService: NgxRolesService,
              private ngxPermissionsConfigurationService: NgxPermissionsConfigurationService) {}

  ngOnInit() {
    this.invoiceService.getRole()
      .subscribe(role => {
        this.ngxRolesService.addRoleWithPermissions(role.name, role.permissions)
      })
    this.ngxPermissionsConfigurationService.addPermissionStrategy('disable', (templateRef) => {
      this.renderer.setAttribute(templateRef?.elementRef.nativeElement.previousSibling, 'disabled', 'true')
    })
    this.ngxPermissionsConfigurationService.addPermissionStrategy('enable', (templateRef) => {
      this.renderer.removeAttribute(templateRef?.elementRef.nativeElement.previousSibling, 'disabled');
    })
  }
  title = 'invoice-app';
}
