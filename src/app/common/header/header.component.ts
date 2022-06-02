import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(public authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.hasAdminRole();
  }
}
