import {Component, OnInit, Renderer2} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {NgxPermissionsConfigurationService, NgxPermissionsService, NgxRolesService} from "ngx-permissions";
import {RoleService} from "./services/role.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'invoice-app';

  constructor(public dialog: MatDialog,
              private renderer: Renderer2,
              private roleService: RoleService,
              private ngxPermissionsService: NgxPermissionsService,
              private ngxRolesService: NgxRolesService,
              private ngxPermissionsConfigurationService: NgxPermissionsConfigurationService) {
  }

  ngOnInit() {
    this.roleService.getRole()
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
}
