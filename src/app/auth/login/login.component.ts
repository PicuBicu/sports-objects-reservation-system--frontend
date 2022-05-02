import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import LoginDto from "../model/LoginDto";
import UserDto from "../../user/UserDto";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastService: ToastrService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public email(): FormControl {
    return this.loginForm.get("email") as FormControl;
  }

  public password(): FormControl {
    return this.loginForm.get("password") as FormControl;
  }

  public submitForm() {
    if (this.loginForm.valid) {
      const loginDto = this.loginForm.value as LoginDto;
      console.log(loginDto);
      this.authService.signUserIn(loginDto).subscribe(
        user => {
          this.saveUserToSessionStorage(user);
          this.toastService.success(`Witaj ${user.firstName}`, 'Major Error', {
            timeOut: 3000,
          });
        },
        error => {
          switch (error.status) {
            case 403:
              this.toastService.error("Niepoprawne dane logowania", 'Major Error', {
                timeOut: 3000,
              });
          }

        }
      );
    }
  }

  private saveUserToSessionStorage(user: UserDto) {
    sessionStorage.setItem("token", user.jwtToken);
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

}

