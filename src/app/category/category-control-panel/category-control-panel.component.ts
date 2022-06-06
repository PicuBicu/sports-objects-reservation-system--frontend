import { Component, OnInit } from "@angular/core";
import { Category } from "app/models/entities/category";

import { CategoryService } from "../category.service";

@Component({
  selector: "app-category-control-panel",
  templateUrl: "./category-control-panel.component.html",
  styleUrls: ["./category-control-panel.component.css"],
})
export class CategoryControlPanelComponent implements OnInit {
  categories: Category[] = [];
  hasDataChanged = false;

  constructor(private categoryService: CategoryService) {
    this.getCategories();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.hasDataChanged = true;
      },
    });
  }

  public refreshCategories($event: any) {
    this.getCategories();
  }
}
