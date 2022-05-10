import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import LoginDto from "./model/LoginDto";
import {Observable} from "rxjs";
import UserDto from "../user/UserDto";
import * as moment from "moment";
import {RegisterDto} from "./model/RegisterDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl: string = "http://localhost:8080/api/auth";

  constructor(private httpClient: HttpClient) {
  }

  public signUserIn(loginDto: LoginDto): Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${this.authUrl}/sign-in`, loginDto);
  }

  public signUserUp(registerDto: RegisterDto): Observable<any> {
    return this.httpClient.post<UserDto>(`${this.authUrl}/sign-up`, registerDto);
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public saveUserInSessionStorage(user: UserDto): void {
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("firstName", user.firstName);
    sessionStorage.setItem("lastName", user.lastName);
    sessionStorage.setItem("localNumber", user.address.localNumber);
    sessionStorage.setItem("cityName", user.address.cityName);
    sessionStorage.setItem("streetName", user.address.streetName);
    sessionStorage.setItem("streetNumber", user.address.streetNumber);
    sessionStorage.setItem("phoneNumber", user.phoneNumber);
    sessionStorage.setItem("userRole", user.role.join(","));
  }

  public saveExpirationDate(expirationTime: string): void {
    const expiresAt = moment().add(expirationTime, 'second');
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  public saveToken(token: string): void {
    localStorage.setItem("token", token);
  }

  public logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
  }

  private getExpiration(): moment.Moment {
    const expiration = localStorage.getItem("expires_at") || "";
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
