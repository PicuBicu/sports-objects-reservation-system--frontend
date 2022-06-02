import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { ActivatedRoute } from "@angular/router";
import { CategoryService } from "app/category/category.service";
import { Category } from "app/models/entities/category";
import { NewSportObjectRequest } from "app/models/request/new-sport-object-request";
import { ToastrService } from "ngx-toastr";
import { map, Observable, startWith } from "rxjs";
import { SportObject } from "../sport-object";
import { SportObjectsService } from "../sport-objects.service";

@Component({
  selector: "app-sport-objects-details",
  templateUrl: "./sport-objects-details.component.html",
  styleUrls: ["./sport-objects-details.component.css"],
})
export class SportObjectsDetailsComponent implements OnInit {
  public imageUrl = "";
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public sportObject?: SportObject;
  public categories: string[] = [];
  public allCategories: Category[] = [];
  public filteredCategories?: Observable<string[]>;
  public categoryCtrl: FormControl = new FormControl();
  @ViewChild("categoryInput") categoryInput!: ElementRef<HTMLInputElement>;
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sportObjectService: SportObjectsService,
    private toastService: ToastrService,
    private categoryService: CategoryService
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
    this.form = this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.pipe(map((p) => p.id)).subscribe({
      next: (sportObjectId) => {
        this.sportObjectService.getSportObjectById(sportObjectId).subscribe({
          next: (data) => {
            this.sportObject = data;
            this.imageUrl = this.sportObject.imageName;
            this.setFormValues();
            this.categories = [...this.sportObject.categories].map(
              (category) => category.name
            );
          },
          error: (error) =>
            this.toastService.error(
              `Nie udało się wczytac obiektu o id ${sportObjectId}`
            ),
        });
      },
    });
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      name: ["", [Validators.required]],
      imageName: ["", [Validators.required]],
      cityName: ["", [Validators.required]],
      streetName: ["", [Validators.required]],
      streetNumber: ["", [Validators.required]],
      localNumber: ["", [Validators.required]],
    });
  }

  private setFormValues() {
    this.form.setValue({
      name: this.sportObject?.name,
      imageName: this.sportObject?.imageName,
      cityName: this.sportObject?.address.cityName,
      streetName: this.sportObject?.address.streetName,
      streetNumber: this.sportObject?.address.streetNumber,
      localNumber: this.sportObject?.address.localNumber,
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

  clearCategories(event: Event) {
    this.categories = [];
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allCategories
      .filter((category) => category.name.toLowerCase().includes(filterValue))
      .map((category) => category.name);
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.allCategories = data),
      error: (error) =>
        this.toastService.error("Nie udało się pobrac kategorii"),
    });
  }

  public submitForm(): void {
    console.log(this.categories);
    if (this.form.valid && this.categories.length !== 0) {
      const sportObjectId: number = this.sportObject?.id || 0;
      const newSportObjectRequest: NewSportObjectRequest = {
        categories: this.categories,
        ...this.form.value,
      };
      this.sportObjectService
        .updateSportObjectById(sportObjectId, newSportObjectRequest)
        .subscribe({
          next: (data) => {
            this.toastService.success(
              `Pomyślnie zaaktualizowano obiekt sportowy o id ${sportObjectId}`
            );
          },
          error: (error) =>
            this.toastService.error(
              "Nie udało się zaaktualizować obiektu sportowego"
            ),
        });
    }
  }
}
