import {Component, Inject, OnInit} from '@angular/core';
import {Seller} from "../../entities/seller";
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {InvoiceService} from "../../services/invoice.service";
import {ThumbnailComponent} from "../thumbnail/thumbnail.component";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {EditComponent} from "../edit/edit.component";
import {ThumbnailSellersComponent} from "../thumbnail-sellers/thumbnail-sellers.component";
import {NgxPermissionsService} from "ngx-permissions";

const EDIT_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
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

  dataSource: Seller[] = [];
  subscription: Subscription = new Subscription();
  dataSourceFilter: Seller[] = [];
  filteredValue: Seller = {id: 0, name: "", address: ""};
  role: string[] = ['test'];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog,
              private invoiceService: InvoiceService) {
    iconRegistry.addSvgIconLiteral('edit', sanitizer.bypassSecurityTrustHtml(EDIT_ICON))
  }
  ngOnInit(){
    this.subscription = this.invoiceService.invokeSeller$.subscribe(() => {
      this.getSellers()
    })
    this.getSellers();
  }


  getSellers(): void {
    this.invoiceService.getSellers()
      .subscribe(sellers => {
        this.dataSource = sellers
        this.dataSourceFilter = sellers
      })
  }

  openDialog(data: Seller) {
    this.dialog.open(ThumbnailSellersComponent, {data});
  }

  openEdit(data: Seller)
  {
    console.log(data)
    this.dialog.open(EditComponent, {data})
  }

  applyFilter() {

    if (this.filteredValue !== undefined)
    {
      this.dataSource = this.dataSourceFilter.filter(seller => seller.id === this.filteredValue.id)
    }
    else {
      this.getSellers()
    }
  }

  displayedColumns: string[] = ['id', 'name', 'address', 'action'];

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
