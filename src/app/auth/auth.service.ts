import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginRequest } from "app/app/models/request/login-request";
import { RegisterRequest } from "app/app/models/request/register-request";
import { BehaviorSubject, Observable } from "rxjs";
import * as moment from "moment";
import { Router } from "@angular/router";
import { User } from "app/app/models/entities/user";

@Injectable({
  providedIn: "root",
})
// todo: change current jwt checking to jwt library
export class AuthService {
  // todo: add behaviour subject

  private authUrl: string = "http://localhost:8080/api/auth";

  constructor(private httpClient: HttpClient, private router: Router) {}

  public signUserIn(loginDto: LoginRequest): Observable<User> {
    return this.httpClient
      .post<User>(`${this.authUrl}/sign-in`, loginDto)
      .pipe();
  }

  // todo: could be type not any type
  public signUserUp(registerDto: RegisterRequest): Observable<any> {
    return this.httpClient.post<User>(`${this.authUrl}/sign-up`, registerDto);
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public saveUserInSessionStorage(user: User): void {
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
    const expiresAt = moment().add(expirationTime, "second");
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  public saveToken(token: string): void {
    localStorage.setItem("token", token);
  }

  public logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("expires_at");
    this.router.navigateByUrl("login");
  }

  private getExpiration(): moment.Moment {
    const expiration = localStorage.getItem("expires_at") || "";
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
