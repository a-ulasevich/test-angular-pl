import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Role} from "../../models/role";
import {RoleService} from "../../services/role.service";

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

  constructor(private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.getPermissions();
  }

  addRole(name: string, permissions: string[]): void {
    this.roleService.addRole({name, permissions} as Role)
  }

  getPermissions(): void {
    this.roleService.getPermissions()
      .subscribe(permissions => {
        this.data = permissions
        this.selected = this.data
      });
  }

  submit(form: NgForm) {
    console.log(form.value.name, form.value.permissions)
    this.addRole(form.value.name, form.value.permissions);
  }

}
