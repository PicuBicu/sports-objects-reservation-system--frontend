import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { Reservation } from "app/models/entities/reservation";
import { User } from "app/models/entities/user";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
  displayedColumns = [
    "id",
    "status",
    "creationDate",
    "reservationDate",
    "numOfUsers",
    "sportObjectId",
  ];
  userData?: User;
  userReservations: Reservation[] = [];
  dataSource?: MatTableDataSource<Reservation>;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    const email: string = this.route.snapshot.params.email;
    this.getUserDetails(email);
    this.getUserReservations(email);
  }

  public getUserDetails(email: string) {
    this.userService.getUserByEmail(email).subscribe({
      next: (user) => (this.userData = user),
      error: () =>
        this.toastService.error(
          `Nie udało się pobrać informacji o użytkowniku ${email}`
        ),
    });
  }

  public getUserReservations(email: string) {
    this.userService.getUsersReservations(email).subscribe({
      next: (data) => {
        this.userReservations = data;
        this.dataSource = new MatTableDataSource(this.userReservations);
      },
      error: () =>
        this.toastService.error(
          `Nie udało się pobrać rezerwacji użytkownika ${email}`
        ),
    });
  }
}
