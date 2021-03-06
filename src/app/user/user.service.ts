import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "app/models/entities/user";
import { Reservation } from "app/models/entities/reservation";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userUrl: string = "http://localhost:8080/api/user";

  constructor(private httpClient: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.userUrl}/`);
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.userUrl}/${email}`);
  }

  public deleteUserByEmail(email: string): Observable<string> {
    return this.httpClient.delete(`${this.userUrl}/${email}`, {
      responseType: "text",
    });
  }

  public getUsersReservations(email: string): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(
      `${this.userUrl}/${email}/reservations`
    );
  }

  public getAllUsersByActivationStatus(
    isActivated: boolean
  ): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${this.userUrl}/activated/${isActivated}`
    );
  }

  public changeUserAccountStatus(
    email: string,
    isActivated: boolean
  ): Observable<string> {
    return this.httpClient.put<any>(
      `${this.userUrl}/?email=${email}&isActivated=${isActivated}`,
      { responseType: "text" }
    );
  }
}
