import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Seller} from "../models/seller";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private sellersUrl = 'api/sellers';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }


  getSellers(): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.sellersUrl)
  }

  updateSeller(seller: Seller): Observable<Seller> {
    return this.http.put<Seller>(this.sellersUrl, seller, this.httpOptions);
  }
}
