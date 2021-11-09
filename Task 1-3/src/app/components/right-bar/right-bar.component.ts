import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddComponent} from "../add/add.component";
import {AddRoleComponent} from "../add-role/add-role.component";

@Component({
  selector: 'app-right-bar',
  templateUrl: './right-bar.component.html',
  styleUrls: ['./right-bar.component.css']
})
export class RightBarComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  openDialog(action: string) {
    if (action === 'addInvoice') {
      this.dialog.open(AddComponent)
    } else if (action === 'addRole') {
      this.dialog.open(AddRoleComponent)
    }
  }

  ngOnInit(): void {
  }
}
