import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Role} from "../models/role";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private roleUrl = 'api/role';
  private rolesListUrl = 'api/rolesList';
  private permissionsUrl = 'api/permissions';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  constructor(private http: HttpClient) {
  }

  getRole(): Observable<Role> {
    return this.http.get<Role>(this.roleUrl);
  }

  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(this.rolesListUrl, role, this.httpOptions)
  }

  getPermissions(): Observable<string[]> {
    return this.http.get<string[]>(this.permissionsUrl);
  }
}
