import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReservationRequest } from "app/models/request/reservation-request";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReservationService {
  private httpUrl: string = "http://localhost:8080/api/reservation/";

  constructor(private httpClient: HttpClient) {}

  public addReservation(reservation: ReservationRequest): Observable<string> {
    return this.httpClient.post<any>(this.httpUrl, reservation);
  }
}
