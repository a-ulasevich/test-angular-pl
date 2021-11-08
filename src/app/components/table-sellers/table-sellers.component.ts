import {Component,OnInit} from '@angular/core';
import {Seller} from "../../entities/seller";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {InvoiceService} from "../../services/invoice.service";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {EditComponent} from "../edit/edit.component";
import {ThumbnailSellersComponent} from "../thumbnail-sellers/thumbnail-sellers.component";

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
