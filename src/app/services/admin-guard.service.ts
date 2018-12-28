import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate
} from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class AdminGuardService implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isAuthenticated()) {
      if (this.auth.getUser().role == "admin") {
        return true;
      }
    } else {
      console.error("Bloqueado por el guard admin");
      return false;
    }
  }
}
