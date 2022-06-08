import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "app/category/category.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.css"],
})
export class AddCategoryComponent {
  @Output() addedCategory = new EventEmitter<any>();
  form: FormGroup;
  constructor(
    private categoryService: CategoryService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      categoryName: ["", [Validators.required]],
    });
  }

  // todo: clearing form
  public submitNewCategory() {
    if (this.form.valid) {
      const categoryName = this.form.value.categoryName;
      this.categoryService.addCategory(categoryName).subscribe({
        next: (data) => {
          this.toastService.success(`Dodano kategorię ${categoryName}`);
          this.addedCategory.emit();
          this.form.reset();
          this.form.markAsPristine();
          this.form.clearValidators();
          console.log(this.form.controls.categoryName);
        },
        error: (error) => {
          this.toastService.error(
            `Nie udało się dodać kategorii ${categoryName}`
          );
        },
      });
    }
  }
}
