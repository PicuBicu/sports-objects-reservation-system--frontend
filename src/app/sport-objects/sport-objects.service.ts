import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NewSportObjectRequest } from "app/models/request/new-sport-object-request";
import { Observable } from "rxjs";
import { SportObject } from "./sport-object";
import { UpdateSportObjectRequest } from "./update-sport-object-request";

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

  public getAllSportObjects(): Observable<SportObject[]> {
    return this.httpClient.get<SportObject[]>(`${this.httpUrl}/`);
  }

  public getSportObjectById(sportObjectId: number): Observable<SportObject> {
    return this.httpClient.get<SportObject>(`${this.httpUrl}/${sportObjectId}`);
  }

  public deleteSportObjectById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.httpUrl}/${id}`);
  }

  public updateSportObjectById(
    id: number,
    sportObjectRequest: UpdateSportObjectRequest
  ): Observable<any> {
    return this.httpClient.put<any>(
      `${this.httpUrl}/${id}`,
      sportObjectRequest
    );
  }
}
