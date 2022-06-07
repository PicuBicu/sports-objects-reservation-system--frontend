import { Component } from "@angular/core";
import { Event } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  isLoggedIn: boolean;
  isAdmin: boolean;
  email: string;

  constructor(public authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.hasAdminRole();
    this.email = sessionStorage.getItem("email") ?? "";
  }

  logout() {
    this.authService.logout();
  }
}
