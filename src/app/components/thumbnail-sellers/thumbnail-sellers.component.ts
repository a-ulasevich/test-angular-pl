import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Seller} from "../../models/seller";

@Component({
  selector: 'app-thumbnail-sellers',
  templateUrl: './thumbnail-sellers.component.html',
  styleUrls: ['./thumbnail-sellers.component.css']
})
export class ThumbnailSellersComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Seller) {
  }

  ngOnInit(): void {
  }

}
