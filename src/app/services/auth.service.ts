import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthService {
  authenticated: boolean;
  url: string = "http://localhost/geometryapi/public/api/";
  data_user: any;
  constructor(public router: Router, private http: HttpClient) {
    this.authenticated = false;
  }

  public login(data) {
    return this.http.post(`${this.url}login`, data);
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem("token") == undefined || localStorage.getItem("token") == "") {
      this.authenticated=false;
    }
    else {
      let fecExp = localStorage.getItem('expira');
      let hoy = new Date();
        if (parseInt(fecExp) >= hoy.getTime()) {
          this.authenticated=true;
      }
      else {
        localStorage.removeItem("data_user");
        localStorage.removeItem("token");
        localStorage.removeItem("expira");
        this.authenticated=false;
      }
    }
    return this.authenticated;
  }
  public logout() {
    this.authenticated = false;
    
    let token="Bearer " + this.getUser().token;
    let headers = new HttpHeaders({
      Authorization: token
    });
    localStorage.removeItem("data_user");
    localStorage.removeItem("token");
    localStorage.removeItem("expira");
    this.router.navigate(["login"]);
    let data={
      "token": token
    }
    return this.http.post(`${this.url}logout`, data,{headers});
  }
  public handleAuthentication(): void {}
  public register(data) {
    return this.http.post(`${this.url}register`, data);
  }
  changeAutenticated(resp) {
    this.authenticated = true;
    this.data_user = resp;
    localStorage.setItem("data_user", JSON.stringify(this.data_user.usuario));
    localStorage.setItem("token", this.data_user.token);
    localStorage.setItem("expira", ""+this.data_user.expira*1000);
    console.log(resp);
  }
  getUser() {
    this.data_user = JSON.parse(localStorage.getItem("data_user"));
    this.data_user.token=localStorage.getItem("token");
    return this.data_user;
  }
  public isAdmin(): boolean {
    if(this.getUser().role == "admin"){
      return true;
    }
    else{
      return false;
    }
  }
}
