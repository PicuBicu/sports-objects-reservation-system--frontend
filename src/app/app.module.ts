import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FooterComponent } from "./common/footer/footer.component";
import { HeaderComponent } from "./common/header/header.component";

import { LoginComponent } from "./auth/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { RegisterComponent } from "./auth/register/register.component";
import { UserControlPanelComponent } from "./user/user-control-panel/user-control-panel.component";
import { UserDetailsComponent } from "./user/user-details/user-details.component";
import { SportObjectControlPanelComponent } from "./sport-objects/sport-objects-control-panel/sport-object-control-panel.component";
import { CreateSportObjectDialogComponent } from "./sport-objects/create-sport-object-dialog/create-sport-object-dialog.component";
import { JwtHelperService, JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";
import { StartComponent } from "./common/start/start.component";
import { SportObjectsDetailsComponent } from "./sport-objects/sport-objects-details/sport-objects-details.component";
import { MaterialModule } from "./material/material.module";
import { AddCategoryComponent } from "./category/category-control-panel/add-category/add-category.component";
import { CategoryControlPanelComponent } from "./category/category-control-panel/category-control-panel.component";
import { CategoryTableComponent } from "./category/category-control-panel/category-table/category-table.component";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    UserControlPanelComponent,
    UserDetailsComponent,
    SportObjectControlPanelComponent,
    CreateSportObjectDialogComponent,
    StartComponent,
    SportObjectsDetailsComponent,
    AddCategoryComponent,
    CategoryControlPanelComponent,
    CategoryTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-top-right",
      preventDuplicates: true,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
