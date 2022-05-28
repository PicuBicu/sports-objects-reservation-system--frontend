import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NewSportObjectRequest } from "app/models/request/new-sport-object-request";
import { CreateSportObjectDialogComponent } from "../create-sport-object-dialog/create-sport-object-dialog.component";
import { SportObjectsService } from "../sport-objects.service";

@Component({
  selector: "app-sport-object-control-panel",
  templateUrl: "./sport-object-control-panel.component.html",
  styleUrls: ["./sport-object-control-panel.component.css"],
})
export class SportObjectControlPanelComponent implements OnInit {
  constructor(public createSportObjectDialog: MatDialog) {}

  ngOnInit(): void {}

  openCreateSportObjectDialog() {
    this.createSportObjectDialog.open(CreateSportObjectDialogComponent, {});
  }
}
