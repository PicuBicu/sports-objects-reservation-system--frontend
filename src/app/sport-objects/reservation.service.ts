import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Reservation } from "app/models/entities/reservation";
import { ReservationStatus } from "app/models/entities/reservation-status";
import { ReservationRequest } from "app/models/request/reservation-request";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  private httpUrl: string = "http://localhost:8080/api/reservation";

  constructor(private httpClient: HttpClient) {}

  public addReservation(reservation: ReservationRequest): Observable<string> {
    return this.httpClient.post<any>(`${this.httpUrl}/`, reservation);
  }

  public getReservationWithStatus(
    statusName: string
  ): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(
      `${this.httpUrl}/status/${statusName}`
    );
  }

  public getReservationStatuses(): Observable<ReservationStatus[]> {
    return this.httpClient.get<ReservationStatus[]>(`${this.httpUrl}/status/`);
  }
}
