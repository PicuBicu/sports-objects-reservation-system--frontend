import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { RoleGuard } from "./auth/role.guard";
import { AddCategoryComponent } from "./category/category-control-panel/add-category/add-category.component";
import { CategoryControlPanelComponent } from "./category/category-control-panel/category-control-panel.component";
import { StartComponent } from "./common/start/start.component";
import { ReservationControlPanelComponent } from "./reservations/reservation-control-panel/reservation-control-panel.component";
import { AvailableSportObjectsComponent } from "./sport-objects/available-sport-objects/available-sport-objects.component";
import { MakeReservationComponent } from "./sport-objects/make-reservation/make-reservation.component";
import { SportObjectControlPanelComponent } from "./sport-objects/sport-objects-control-panel/sport-object-control-panel.component";
import { SportObjectsDetailsComponent } from "./sport-objects/sport-objects-details/sport-objects-details.component";
import { UserControlPanelComponent } from "./user/user-control-panel/user-control-panel.component";
import { UserDetailsComponent } from "./user/user-details/user-details.component";

const routes: Routes = [
  { path: "home", component: StartComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "available-sport-objects",
    component: AvailableSportObjectsComponent,
  },
  {
    path: "sport-objects/:id/reservation",
    component: MakeReservationComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: "ROLE_USER",
    },
  },
  {
    path: "users",
    component: UserControlPanelComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: "ROLE_ADMIN",
    },
  },
  {
    path: "users/:email",
    component: UserDetailsComponent,
  },
  {
    path: "sport-objects",
    component: SportObjectControlPanelComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: "ROLE_ADMIN",
    },
  },
  {
    path: "sport-objects/:id",
    component: SportObjectsDetailsComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: "ROLE_ADMIN",
    },
  },
  {
    path: "categories",
    component: CategoryControlPanelComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: "ROLE_ADMIN",
    },
  },
  {
    path: "reservations",
    component: ReservationControlPanelComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: "ROLE_ADMIN",
    },
  },
  { path: "**", component: StartComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
