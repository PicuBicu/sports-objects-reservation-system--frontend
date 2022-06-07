import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { SportObject } from "../sport-object";
import { SportObjectsService } from "../sport-objects.service";

@Component({
  selector: "app-available-sport-objects",
  templateUrl: "./available-sport-objects.component.html",
  styleUrls: ["./available-sport-objects.component.css"],
})
export class AvailableSportObjectsComponent implements OnInit {
  sportObjects: SportObject[] = [];

  constructor(
    private sportObjectService: SportObjectsService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getSportObjects();
  }

  getSportObjects() {
    this.sportObjectService.getAllSportObjects().subscribe({
      next: (data) => (this.sportObjects = data),
      error: (error) =>
        this.toastService.error(
          "Nie udało się pobrać listy obiektów sportowych"
        ),
    });
  }
}
