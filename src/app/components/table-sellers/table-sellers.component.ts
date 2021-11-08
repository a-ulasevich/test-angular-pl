import {Component, OnInit} from '@angular/core';
import {Seller} from "../../models/seller";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {EditComponent} from "../edit/edit.component";
import {ThumbnailSellersComponent} from "../thumbnail-sellers/thumbnail-sellers.component";
import {SellerService} from "../../services/seller.service";

const EDIT_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px">
    <g>
        <rect fill="none" height="24" width="24"/>
    </g>
    <g><g><g>
    <path d="M3,21l3.75,0L17.81,9.94l-3.75-3.75L3,17.25L3,21z M5,18.08l9.06-9.06l0.92,0.92L5.92,19L5,19L5,18.08z"/></g><g>
    <path d="M18.37,3.29c-0.39-0.39-1.02-0.39-1.41,0l-1.83,1.83l3.75,3.75l1.83-1.83c0.39-0.39,0.39-1.02,0-1.41L18.37,3.29z"/>
    </g></g></g></svg>`

@Component({
  selector: 'app-table-sellers',
  templateUrl: './table-sellers.component.html',
  styleUrls: ['./table-sellers.component.css']
})
export class TableSellersComponent implements OnInit {

  sellers: Seller[] = [];
  filteredSellers: Seller[] = [];
  sellersSelect: Seller[] = [];
  subscription: Subscription = new Subscription();
  filteredValue?: Seller;
  role: string[] = [''];
  displayedColumns: string[] = ['id', 'name', 'address', 'action'];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog,
              private sellerService: SellerService) {
    iconRegistry.addSvgIconLiteral('edit', sanitizer.bypassSecurityTrustHtml(EDIT_ICON))
  }

  ngOnInit() {
    this.subscription = this.sellerService.invokeSeller$.subscribe(() => {
      this.getSellers()
    })
    this.getSellers();
  }

  getSellers(): void {
    this.sellerService.getSellers()
      .subscribe(sellers => {
        this.sellers = sellers
        this.filteredSellers = sellers
        this.sellersSelect = sellers
      })
  }

  openDialog(data: Seller) {
    this.dialog.open(ThumbnailSellersComponent, {data});
  }

  openEdit(data: Seller) {
    this.dialog.open(EditComponent, {data})
  }

  applyFilter() {
    console.log(this.sellersSelect)
    this.filteredSellers = this.filteredValue ? this.sellers.filter(seller => seller.id === this.filteredValue?.id) : this.sellers
    console.log(this.sellersSelect)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
