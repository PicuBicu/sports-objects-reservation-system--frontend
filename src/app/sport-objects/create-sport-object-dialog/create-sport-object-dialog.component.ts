import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CategoryService } from "app/category/category.service";
import { Category } from "app/models/entities/category";
import { NewSportObjectRequest } from "app/models/request/new-sport-object-request";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { CreateSportObjectDialogData } from "../create-sport-object-dialog-data";
import { SportObjectsService } from "../sport-objects.service";

@Component({
  selector: "app-create-sport-object-dialog",
  templateUrl: "./create-sport-object-dialog.component.html",
  styleUrls: ["./create-sport-object-dialog.component.css"],
})
export class CreateSportObjectDialogComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredCategories?: Observable<string[]>;
  categories: string[] = [];
  categoryCtrl: FormControl = new FormControl();
  allCategories: Category[] = [];
  @ViewChild("categoryInput") categoryInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<CreateSportObjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: CreateSportObjectDialogData,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private sportObjectService: SportObjectsService,
    private toastService: ToastrService
  ) {
    this.getCategories();
    this.filteredCategories = this.categoryCtrl?.valueChanges.pipe(
      startWith(null),
      map((category: string | null) =>
        category
          ? this._filter(category)
          : this.allCategories.slice().map((category) => category.name)
      )
    );
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.allCategories = data),
      error: (error) =>
        this.toastService.error("Nie udało się pobrac kategorii"),
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();
    if (value) {
      this.categories.push(value);
    }
    event.chipInput!.clear();
    this.categoryCtrl.setValue(null);
  }

  remove(category: string): void {
    const index = this.categories.indexOf(category);
    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = "";
    this.categoryCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCategories
      .filter((category) => category.name.toLowerCase().includes(filterValue))
      .map((category) => category.name);
  }

  public createSportObjectForm = this.formBuilder.group({
    name: ["", [Validators.required]],
    imageName: ["", [Validators.required]],
    cityName: ["", [Validators.required]],
    streetName: ["", [Validators.required]],
    streetNumber: ["", [Validators.required]],
    localNumber: ["", [Validators.required]],
  });

  public submitForm(): void {
    if (this.createSportObjectForm.valid && this.categories.length !== 0) {
      const newSportObjectRequest: NewSportObjectRequest = {
        categories: this.categories,
        ...this.createSportObjectForm.value,
      };
      this.sportObjectService
        .addNewSportObject(newSportObjectRequest)
        .subscribe({
          next: (data) => {
            this.toastService.success("Pomyślnie dodano nowy obiekt sportowy");
            this.dialogRef.close();
          },
          error: (error) =>
            this.toastService.error("Nie udało się dodac obiektu sportowego"),
        });
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
