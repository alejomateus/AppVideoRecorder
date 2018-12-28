import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { APPROUTING } from './app.routes';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { VideoComponent } from './components/video/video.component';
import { AdminGuardService } from './services/admin-guard.service';
import { ExcelService } from './services/excel.service';
import {DataTableModule} from "angular-6-datatable";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProtectedComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTableModule,
    APPROUTING
  ],
  providers: [
    AuthService,
    AdminGuardService,
    AuthGuardService,
    ExcelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
