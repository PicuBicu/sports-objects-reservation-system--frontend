import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {RegisterDto} from "../model/RegisterDto";
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private static PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}/;
  private static PHONE_NUMBER_REGEXP = new RegExp("[0-9]{7,9}", 'm');
  public personalDataForm!: FormGroup;
  public addressFormData!: FormGroup;
  private registerSubscription!: Subscription;

  constructor(private formBuilder: FormBuilder,
              private toastService: ToastrService,
              private authService: AuthService) {
  }

  get firstName() {
    return this.personalDataForm.get("firstName");
  }

  get lastName() {
    return this.personalDataForm.get("lastName");
  }

  get phoneNumber() {
    return this.personalDataForm.get("phoneNumber");
  }

  get email() {
    return this.personalDataForm.get("email");
  }

  get password() {
    return this.personalDataForm.get("password");
  }

  get streetName() {
    return this.addressFormData.get("streetName");
  }

  get streetNumber() {
    return this.addressFormData.get("streetNumber");
  }

  get localNumber() {
    return this.addressFormData.get("localNumber");
  }

  get cityName() {
    return this.addressFormData.get("cityName");
  }

  ngOnDestroy(): void {
    this.registerSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.personalDataForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      phoneNumber: ["", [Validators.required, Validators.pattern(RegisterComponent.PHONE_NUMBER_REGEXP)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(RegisterComponent.PASSWORD_REGEXP)]],

    })
    this.addressFormData = this.formBuilder.group({
      streetName: ["", Validators.required],
      streetNumber: ["", Validators.required],
      localNumber: ["", Validators.required],
      cityName: ["", Validators.required]
    })
  }

  public submitForm(): void {
    if (this.personalDataForm.valid && this.addressFormData) {
      const registerDto = {
        ...this.personalDataForm.value,
        ...this.addressFormData.value
      } as RegisterDto;
      this.registerSubscription = this.authService.signUserUp(registerDto).subscribe({
        next: (item) => {
          this.toastService.success(`Pomyślnie zarejestrowano użytkownika`, 'Sukces');
          this.personalDataForm.reset();
          this.addressFormData.reset();
        },
        error: error => {
          console.log(error);
          this.toastService.error("Niepoprawne dane rejestracji", 'Błąd')
        }
      });
    }
  }
}
