import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginRequest } from "app/models/request/login-request";
import { RegisterRequest } from "app/models/request/register-request";
import { Router } from "@angular/router";
import { User } from "app/models/entities/user";
import { JwtHelperService } from "@auth0/angular-jwt";
import { JwtPayload } from "app/models/jwt-payload";
import decode from "jwt-decode";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
// todo: change current jwt checking to jwt library
export class AuthService {
  // todo: add behaviour subject

  private authUrl: string = "http://localhost:8080/api/auth";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

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
    const tokenString: string = localStorage.getItem("token") ?? "";
    return !this.jwtHelper.isTokenExpired(tokenString);
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

  public saveToken(token: string): void {
    localStorage.setItem("token", token);
  }

  public logout(): void {
    localStorage.removeItem("token");
    this.router.navigateByUrl("login");
  }

  public hasAnyRole(expectedRole: string, roleList: string[]) {
    return roleList.filter((role) => expectedRole === role).length !== 0;
  }

  public getUserRoles() {
    const token: string = localStorage.getItem("token") ?? "";
    const payload: JwtPayload = decode(token);
    return payload.roles;
  }

  public hasAdminRole(): boolean {
    return this.hasAnyRole("ROLE_ADMIN", this.getUserRoles());
  }
}
