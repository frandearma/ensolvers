import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import { environment } from '../../../environments/environment';
//import { TokenService } from '../../../app/services/token/token.service';
import {tap} from "rxjs/operators";
import {Subject} from "rxjs";
import {endpoints} from "../../models/endpoints.enum";

@Injectable({
  providedIn: 'root'
})
export class FoldersService {
  constructor(private http: HttpClient, private router: Router) {

  }
    //private tokenService: TokenService
    getFolders(){
      const urlApi = environment.apiURL + endpoints.folders;
      //const params = new HttpParams().set('page', pageNumber).set('per_page', pageSize);
      //return this.http.get(urlApi,{headers: this.tokenService.getHeader(),params: params});
      return this.http.get(urlApi);
    }
  deleteFolder(id: number) {
    const urlApi = environment.apiURL + endpoints.folders;
    return this.http.delete<any>(urlApi,{body : id});
  }
  setFolder(name: string) {
    const urlApi = environment.apiURL + endpoints.folders;
    return this.http.post<any>(urlApi, {name});
  }
}
