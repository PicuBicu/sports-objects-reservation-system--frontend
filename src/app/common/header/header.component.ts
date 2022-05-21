import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }

  public goToLogin(event: Event) {
    this.router.navigateByUrl("login").then();
  }

  logout() {
    this.authService.logout();
  }
}
