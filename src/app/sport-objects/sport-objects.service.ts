import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewSportObjectRequest } from "app/models/request/new-sport-object-request";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SportObjectsService {
  private httpUrl: string = "http://localhost:8080/api/sport-object";
  constructor(private httpClient: HttpClient) {}

  // todo: change response type
  public addNewSportObject(
    sportObjectRequest: NewSportObjectRequest
  ): Observable<String> {
    return this.httpClient.post(`${this.httpUrl}/`, sportObjectRequest, {
      responseType: "text",
    });
  }
}
