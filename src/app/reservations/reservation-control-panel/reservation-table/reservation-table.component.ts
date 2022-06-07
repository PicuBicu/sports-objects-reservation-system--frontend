import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Reservation } from "app/models/entities/reservation";
import { ReservationStatus } from "app/models/entities/reservation-status";

@Component({
  selector: "app-reservation-table",
  templateUrl: "./reservation-table.component.html",
  styleUrls: ["./reservation-table.component.css"],
})
export class ReservationTableComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() dataChanged: boolean = false;
  @Input() reservations: Reservation[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<Reservation>;

  displayedColumns = [
    "id",
    "status",
    "email",
    "creationDate",
    "reservationDate",
    "numOfUsers",
    "sportObjectId",
  ];

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.reservations);
  }

  ngOnChanges(): void {
    if (this.dataChanged) {
      this.dataSource = new MatTableDataSource(this.reservations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
