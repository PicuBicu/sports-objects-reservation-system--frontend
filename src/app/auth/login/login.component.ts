import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import LoginDto from "../model/LoginDto";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm!: FormGroup;
  private loginSubscription!: Subscription;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastService: ToastrService) {
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
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

  public submitForm(): void {
    if (this.loginForm.valid) {
      const loginDto = this.loginForm.value as LoginDto;
      this.loginSubscription = this.authService.signUserIn(loginDto).subscribe({
        next: (user) => {
          this.authService.saveUserInSessionStorage(user);
          this.authService.saveToken(user.jwtToken);
          this.authService.saveExpirationDate(user.expiresAt)
          this.toastService.success(`Witaj ${user.firstName} 😄`, 'Sukces');
        },
        error: error => {
          console.log(error);
          this.toastService.error("Niepoprawne dane logowania 😥", 'Błąd')
        }
      });
    }
  }


}

