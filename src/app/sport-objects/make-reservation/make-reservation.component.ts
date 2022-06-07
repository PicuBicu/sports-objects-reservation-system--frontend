import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";
import { ReservationRequest } from "app/models/request/reservation-request";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { ReservationService } from "../reservation.service";

@Component({
  selector: "app-make-reservation",
  templateUrl: "./make-reservation.component.html",
  styleUrls: ["./make-reservation.component.css"],
})
export class MakeReservationComponent implements OnInit {
  makeReservationForm: FormGroup;
  hours: string[] = [];
  MIN_HOUR = 10;
  MAX_HOUR = 20;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private toastService: ToastrService,
    private router: Router
  ) {
    this.makeReservationForm = formBuilder.group({
      numOfUsers: [1, [Validators.min(1), Validators.required]],
      day: [1, [Validators.required]],
      hours: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.populateHours();
  }

  populateHours() {
    for (let i = this.MIN_HOUR; i < this.MAX_HOUR; i++) {
      this.hours.push(new String(i) + ":00");
    }
  }

  makeNewReservation() {
    const email: string = sessionStorage.getItem("email") ?? "";
    const sportObjectId: number = this.route.snapshot.params.id;
    if (this.makeReservationForm.valid) {
      const numOfUsers = this.makeReservationForm.value.numOfUsers;
      const reservationDate = moment(this.makeReservationForm.value.day)
        .add(this.makeReservationForm.value.hours)
        .add("2:00") // todo:?
        .toISOString();
      const reservation: ReservationRequest = {
        sportObjectId,
        email,
        reservationDate,
        numOfUsers,
      };
      console.log(reservation);
      this.reservationService.addReservation(reservation).subscribe({
        next: (data) => {
          this.toastService.success(
            `Udało się dokonać rezerwacji dla dzień ${moment(reservationDate)}`
          );
          this.router.navigateByUrl("/available-sport-objects");
        },

        error: (error) => {
          let message = "";
          switch (error.status) {
            case 406:
              message =
                "Podany użytkownik posiada już rezerwację na dany termin";
              break;
            default:
              message = "Nie udało się dokonać rezerwacji";
          }
          this.toastService.error(message);
        },
      });
    }
  }
}
