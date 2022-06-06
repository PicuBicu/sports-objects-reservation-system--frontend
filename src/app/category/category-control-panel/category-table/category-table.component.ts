import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CategoryService } from "app/category/category.service";
import { Category } from "app/models/entities/category";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-category-table",
  templateUrl: "./category-table.component.html",
  styleUrls: ["./category-table.component.css"],
})
export class CategoryTableComponent
  implements OnInit, AfterViewInit, OnChanges
{
  displayedColumns: string[] = ["id", "name", "deletion"];
  dataSource!: MatTableDataSource<Category>;
  @Input() categories: Category[] = [];
  @Input() dataChanged: boolean = false;
  @Output() refreshCategories = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoryService: CategoryService,
    private toastService: ToastrService
  ) {
    this.dataSource = new MatTableDataSource(this.categories);
  }

  ngOnChanges(): void {
    if (this.dataChanged) {
      this.dataSource = new MatTableDataSource(this.categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.categories);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCategory(name: string) {
    this.categoryService.deleteCategoryByName(name).subscribe((response) => {
      this.toastService.success("Pomyślnie usunięto kategorię");
      this.refreshCategories.emit(name);
    });
  }
}
