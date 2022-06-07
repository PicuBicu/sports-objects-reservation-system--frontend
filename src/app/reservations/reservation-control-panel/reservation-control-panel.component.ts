import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { Reservation } from "app/models/entities/reservation";
import { ReservationStatus } from "app/models/entities/reservation-status";
import { ReservationService } from "app/sport-objects/reservation.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-reservation-control-panel",
  templateUrl: "./reservation-control-panel.component.html",
  styleUrls: ["./reservation-control-panel.component.css"],
})
export class ReservationControlPanelComponent implements OnInit {
  reservations: Reservation[] = [];
  statuses: ReservationStatus[] = [];
  hasDataChanged: boolean = false;

  constructor(
    private toastService: ToastrService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.getReservationStatuses();
    this.getReservationWithStatus("REQUESTED");
  }

  private getReservationStatuses() {
    this.reservationService.getReservationStatuses().subscribe({
      next: (data) => {
        this.statuses = data;
      },
      error: (error) => {
        this.toastService.error("Nie udało sie pobrać statusów rezerwacji");
      },
    });
  }

  private getReservationWithStatus(statusName: string) {
    this.reservationService.getReservationWithStatus(statusName).subscribe({
      next: (data) => {
        this.reservations = data;
        this.hasDataChanged = true;
      },
      error: (error) => {
        this.toastService.error(
          `Nie udało sie pobrać rezerwacji z statusem ${statusName}`
        );
      },
    });
  }
  refreshReservations(data: MatSelectChange) {
    this.getReservationWithStatus(data.value);
  }
}
