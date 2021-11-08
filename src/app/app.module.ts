import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { TableComponent } from './table/table.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list";
import { RightBarComponent } from './right-bar/right-bar.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import { AddComponent } from './add/add.component';
import {MatInputModule} from "@angular/material/input";
import {InvoiceService} from "./services/invoice.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./in-memory-data.service";
import {RouterModule, Routes} from "@angular/router";
import {TableSellersComponent} from './table-sellers/table-sellers.component';
import { EditComponent } from './edit/edit.component';
import { ThumbnailSellersComponent } from './thumbnail-sellers/thumbnail-sellers.component';

const routes: Routes = [
  { path: 'invoices', component: TableComponent},
  { path: 'sellers', component: TableSellersComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    TableComponent,
    RightBarComponent,
    ThumbnailComponent,
    AddComponent,
    TableSellersComponent,
    EditComponent,
    ThumbnailSellersComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatSortModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  exports: [RouterModule],
  providers: [InvoiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
