import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import UserDto from "./UserDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string = "http://localhost:8080/api/user";

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(`${this.userUrl}/`);
  }

  public deleteUserByEmail(email: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.userUrl}/${email}`);
  }

  public getAllUsersByActivationStatus(isActivated: boolean): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(`${this.userUrl}/activated/${isActivated}`);
  }

  public changeUserAccountStatus(email: string, isActivated: boolean): Observable<string> {
    return this.httpClient.put<any>(`${this.userUrl}/?email=${email}&isActivated=${isActivated}`,{responseType: "text"});
  }
}
