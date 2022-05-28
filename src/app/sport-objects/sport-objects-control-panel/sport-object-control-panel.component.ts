import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { NewSportObjectRequest } from "app/models/request/new-sport-object-request";
import { ToastrService } from "ngx-toastr";
import { CreateSportObjectDialogComponent } from "../create-sport-object-dialog/create-sport-object-dialog.component";
import { SportObject } from "../sport-object";
import { SportObjectsService } from "../sport-objects.service";

@Component({
  selector: "app-sport-object-control-panel",
  templateUrl: "./sport-object-control-panel.component.html",
  styleUrls: ["./sport-object-control-panel.component.css"],
})
export class SportObjectControlPanelComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "name",
    "imageName",
    "categories",
    "deletion",
    "selection",
  ];
  dataSource!: MatTableDataSource<SportObject>;
  sportObjects: SportObject[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dialogRef!: MatDialogRef<CreateSportObjectDialogComponent>;

  constructor(
    public createSportObjectDialog: MatDialog,
    private toastService: ToastrService,
    private sportObjectsService: SportObjectsService
  ) {}

  ngOnInit(): void {
    this.getSportObjects();
    this.dataSource = new MatTableDataSource(this.sportObjects);
  }

  getSportObjects() {
    this.sportObjectsService.getAllSportObjects().subscribe({
      next: (sportObjects) => {
        this.dataSource = new MatTableDataSource(sportObjects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) =>
        this.toastService.error("Nie udało sie pobrąć obiektów sportowych"),
    });
  }

  openCreateSportObjectDialog() {
    this.dialogRef = this.createSportObjectDialog.open(
      CreateSportObjectDialogComponent,
      {}
    );
    this.dialogRef.afterClosed().subscribe({
      next: (data) => this.getSportObjects(),
      error: (error) => console.error(error),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSportObject(id: number) {
    this.sportObjectsService.deleteSportObjectById(id).subscribe({
      next: (data) => {
        this.toastService.success("Pomyślnie usunięto obiekt sportowy"),
          this.getSportObjects();
      },
      error: (error) =>
        this.toastService.error("Nie udało się usunąć obiektu sportowego"),
    });
  }
}
