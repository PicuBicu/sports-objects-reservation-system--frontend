import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "../user.service";
import { ToastrService } from "ngx-toastr";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { User } from "app/models/entities/user";

@Component({
  selector: "app-user-control-panel",
  templateUrl: "./user-control-panel.component.html",
  styleUrls: ["./user-control-panel.component.css"],
})
// TODO: need to refresh component after performing delete and change user account activation status
export class UserControlPanelComponent {
  displayedColumns: string[] = [
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "deletion",
    "changeStatus",
    "userData",
  ];
  dataSource: MatTableDataSource<User>;
  users: User[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private toastService: ToastrService
  ) {
    this.getUsers();
    this.dataSource = new MatTableDataSource(this.users);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        this.toastService.error("Nie udało się pobrać użytkowników");
      },
    });
  }

  deleteUser(email: string) {
    this.userService.deleteUserByEmail(email).subscribe({
      next: (message) => {
        this.getUsers();
        this.toastService.success("Pomyślnie usunięto użytkownika");
      },
      error: (error) => {
        this.toastService.error("Nie udało się usunąć użytkownika");
      },
    });
  }

  setUserActivationStatus(email: string, isActivated: boolean) {
    this.userService.changeUserAccountStatus(email, isActivated).subscribe({
      next: (message) => {
        this.toastService.success(
          `Pomyślnie zmieniono status aktywacji użytkownika ${email}`
        );
      },
      error: (error) => {
        this.toastService.success(
          `Pomyślnie zmieniono status aktywacji użytkownika ${email}`
        );
      },
    });
  }
}
