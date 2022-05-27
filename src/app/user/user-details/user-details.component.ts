import { ThisReceiver } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLinkActive } from "@angular/router";
import { User } from "app/models/entities/user";
import { ToastrService } from "ngx-toastr";
import { map } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  userData?: User;
  private email?: Observable<string>;

  constructor(
    private routerPath: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.email = this.routerPath.params.pipe(map((p) => p.email));
    this.email.subscribe({
      next: (email) => {
        this.userService.getUserByEmail(email).subscribe({
          next: (user) => (this.userData = user),
          error: () =>
            this.toastService.error(
              `Nie udało się pobrać informacji o użytkowniku ${this.email}`
            ),
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
