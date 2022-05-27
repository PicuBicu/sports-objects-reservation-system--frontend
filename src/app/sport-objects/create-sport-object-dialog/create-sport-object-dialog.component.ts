import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateSportObjectDialogData } from '../create-sport-object-dialog-data';

@Component({
  selector: 'app-create-sport-object-dialog',
  templateUrl: './create-sport-object-dialog.component.html',
  styleUrls: ['./create-sport-object-dialog.component.css']
})
export class CreateSportObjectDialogComponent {

  public createSportObjectForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    imageName:['', [Validators.required]],
    cityName:['', [Validators.required]],
    streetName:['', [Validators.required]],
    streetNumber:['', [Validators.required]],
    localNumber:['', [Validators.required]],
  })

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data: CreateSportObjectDialogData, 
  private formBuilder: FormBuilder) { }
  

  public submitForm(): void {
    if (this.createSportObjectForm.valid) {
      console.log("MOżna wysyłąc")
    }
  }
  
  get name() {
    return this.createSportObjectForm.get("name");
  }

  get imageName() {
    return this.createSportObjectForm.get("imageName");
  }

  get cityName() {
    return this.createSportObjectForm.get("cityName");
  }
  get streetName() {
    return this.createSportObjectForm.get("streetName");
  }
  get streetNumber() {
    return this.createSportObjectForm.get("streetNumber");
  }  
  get localNumber() {
    return this.createSportObjectForm.get("localNumber");
  }  
}
