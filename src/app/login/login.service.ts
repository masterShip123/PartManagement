import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }
  getLogin(){
    return this.http.get("http://localhost:62943/showTableWebService.asmx/GetLogin").map((res) => res.json());
  }
  
}
