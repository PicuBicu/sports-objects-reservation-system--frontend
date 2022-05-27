import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "../auth.service";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { LoginRequest } from "app/models/request/login-request";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  private loginSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  public submitForm(): void {
    if (this.loginForm.valid) {
      const loginDto = this.loginForm.value as LoginRequest;
      this.loginSubscription = this.authService.signUserIn(loginDto).subscribe({
        next: (user) => {
          this.authService.saveUserInSessionStorage(user);
          this.authService.saveToken(user.jwtToken);
          this.toastService
            .success(`Witaj ${user.firstName} 😄`, "Sukces")
            .onShown.subscribe({
              next: () => {
                this.router.navigateByUrl("home");
              },
            });
        },
        error: (error) => {
          console.log(error);
          this.toastService.error("Niepoprawne dane logowania 😥", "Błąd");
        },
      });
    }
  }
}
