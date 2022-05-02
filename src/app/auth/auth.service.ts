import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import LoginDto from "./model/LoginDto";
import {Observable} from "rxjs";
import UserDto from "../user/UserDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl: string = "http://localhost:8080/api/auth/sign-in";

  constructor(private httpClient: HttpClient) {
  }

  public signUserIn(loginDto: LoginDto): Observable<UserDto>{
    return this.httpClient.post<UserDto>(this.authUrl, loginDto);
  }
}
