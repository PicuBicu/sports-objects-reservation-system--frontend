import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {UserControlPanelComponent} from "./user/user-control-panel/user-control-panel.component";
import { UserDetailsComponent } from './user/user-details/user-details.component';

const routes: Routes = [
  {path: "login", component: LoginComponent },
  {path: "register", component: RegisterComponent},
  {path: "users", component: UserControlPanelComponent},
  {path: "users/:email", component: UserDetailsComponent},
  {path: "**", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
