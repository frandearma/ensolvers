import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from '../../../environments/environment';
//import { TokenService } from '../../../app/services/token/token.service';
import {tap} from "rxjs/operators";
import {Subject} from "rxjs";
import {endpoints} from "../../models/endpoints.enum";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient, private router: Router) {
  }
  //private tokenService: TokenService
  getTasks() {
    const urlApi = environment.apiURL + endpoints.task;
    //const params = new HttpParams().set('page', pageNumber).set('per_page', pageSize);
    //return this.http.get(urlApi,{headers: this.tokenService.getHeader(),params: params});
    return this.http.get(urlApi);
  }

  getTask(id: string | null) {
    const urlApi = environment.apiURL + endpoints.task+'/'+id;
    return this.http.get(urlApi);
  }

  getTasksByFolder(id: string | null) {
    const urlApi = environment.apiURL + endpoints.task + '/folder/' + id;
    //const params = new HttpParams().set('page', pageNumber).set('per_page', pageSize);
    //return this.http.get(urlApi,{headers: this.tokenService.getHeader(),params: params});
    return this.http.get(urlApi);
  }

  setTask(detail: string, folder: number) {
    const urlApi = environment.apiURL + endpoints.task;
    return this.http.post<any>(urlApi, {detail, folder});
  }

  updateTask(id: number, folder: number, detail: string) {
    const urlApi = environment.apiURL + endpoints.task;
    return this.http.put<any>(urlApi, {detail, folder});
  }

  checkTask(id: number, checkStatus: boolean) {
    const urlApi = environment.apiURL + endpoints.task + '/' + id;
    return this.http.put<any>(urlApi, {checkStatus});
  }

  deleteTask(id: number) {
    const urlApi = environment.apiURL + endpoints.task;
    return this.http.delete<any>(urlApi);
  }
}
