import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { RoleGuard } from "./auth/role.guard";
import { StartComponent } from "./common/start/start.component";
import { SportObjectControlPanelComponent } from "./sport-objects/sport-objects-control-panel/sport-object-control-panel.component";
import { UserControlPanelComponent } from "./user/user-control-panel/user-control-panel.component";
import { UserDetailsComponent } from "./user/user-details/user-details.component";

const routes: Routes = [
  { path: "home", component: StartComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "users",
    component: UserControlPanelComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRoles: "ROLE_ADMIN",
    },
  },
  { path: "users/:email", component: UserDetailsComponent },
  { path: "sport-objects", component: SportObjectControlPanelComponent },
  { path: "**", component: StartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
