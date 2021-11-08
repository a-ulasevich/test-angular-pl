import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Invoice} from "../../entities/invoice";

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Invoice) { }

  ngOnInit(): void {
  }
}
