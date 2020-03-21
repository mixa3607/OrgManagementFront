import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {PassChallengeDialogComponent} from './auth/pass-challenge-dialog/pass-challenge-dialog.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexModule} from '@angular/flex-layout';
import {HomeComponent} from './home/home.component';
import {JwtInterceptor} from './shared/interceptors/jwt.interceptor';
import {HeaderComponent} from './home/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {EmployeesComponent} from './home/employees/employees.component';
import {AddEmployeeDialogComponent} from './home/employees/add-employee-dialog/add-employee-dialog.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EmployeeComponent } from './home/employees/show-employee-dialog/employee/employee.component';
import { ShowEmployeeDialogComponent } from './home/employees/show-employee-dialog/show-employee-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PassChallengeDialogComponent,
    HomeComponent,
    HeaderComponent,
    EmployeesComponent,
    AddEmployeeDialogComponent,
    DeleteDialogComponent,
    EmployeeComponent,
    ShowEmployeeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    DeviceDetectorModule.forRoot(),
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FlexModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatCheckboxModule,
    FormsModule,
    MatListModule,
    MaterialFileInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
