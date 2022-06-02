import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { JwtPayload } from "app/models/jwt-payload";
import decode from "jwt-decode";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const expectedRole = route.data.expectedRoles;
    const roles = this.authService.getUserRoles();
    if (this.authService.isLoggedIn()) {
      if (this.authService.hasAnyRole(expectedRole, roles)) {
        return true;
      }
      this.router.navigateByUrl("home");
      return false;
    }
    localStorage.clear();
    this.router.navigateByUrl("login");
    return false;
  }
}
