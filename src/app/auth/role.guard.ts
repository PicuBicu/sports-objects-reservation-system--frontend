import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    private toastService: ToastrService
  ) {}

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
      this.toastService.warning("Brak uprawnień");
      this.router.navigateByUrl("home");
      return false;
    }
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl("login");
    return false;
  }
}
