import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: []
})
export class NavbarComponent {
  title: string = "Registrate";
  constructor(private auth: AuthService, private router: Router) {
    auth.handleAuthentication();
    this.verifiedroute();
  }
  verifiedroute() {
    let urlactual = "";
    this.router.events.subscribe((url: any) => {
      if (url.url != undefined) {
        urlactual = url.url;
        console.log(urlactual);
        if (urlactual === "/home") {
          this.title = "Bienvenido";
        } else if (urlactual === "/admin") {
          this.title = "Panel Administrativo";
        }
        else if (urlactual === "/login") {
          this.title = "Registrate";
        }
      }
    });
  }
  logout() {
    this.verifiedroute();
    this.auth.logout().subscribe(
      (resp: any) => {},
      error => {
        console.log("myerror", error);
      }
    );
  }
}
