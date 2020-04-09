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
import {EmployeesComponent} from './home/main-tables/employees/employees.component';
import {AddEmployeeDialogComponent} from './home/main-tables/employees/add-employee-dialog/add-employee-dialog.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMaskModule} from 'ngx-mask';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {
  ButtonWithHeaderComponent,
  EmployeeComponent,
  ValueWithHeaderComponent
} from './home/main-tables/employees/show-employee-dialog/employee/employee.component';
import {ShowEmployeeDialogComponent} from './home/main-tables/employees/show-employee-dialog/show-employee-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CertsComponent } from './home/main-tables/certs/certs.component';
import { CertsTableComponent } from './home/main-tables/certs-table/certs-table.component';
import { DevicesTableComponent } from './home/main-tables/devices-table/devices-table.component';
import { DevicesComponent } from './home/main-tables/devices/devices.component';
import { TypesTableComponent } from './home/service-tables/types-table/types-table.component';
import { DeviceTypesComponent } from './home/service-tables/device-types/device-types.component';
import { DeviceActionTypesComponent } from './home/service-tables/device-action-types/device-action-types.component';
import { AddTypeDialogComponent } from './home/service-tables/add-type-dialog/add-type-dialog.component';
import { AddCertComponent } from './home/main-tables/certs/add-cert/add-cert.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import { AddCertDialogComponent } from './home/main-tables/certs/add-cert-dialog/add-cert-dialog.component';
import { EmployeesTableComponent } from './home/main-tables/employees-table/employees-table.component';
import {ErrorInterceptor} from './shared/interceptors/error.interceptor';
import { AddDeviceComponent } from './home/main-tables/devices/add-device/add-device.component';
import { AddDeviceDialogComponent } from './home/main-tables/devices/add-device-dialog/add-device-dialog.component';
import { SoftwareTableComponent } from './home/main-tables/software-table/software-table.component';
import { DeviceActionsTableComponent } from './home/main-tables/device-actions-table/device-actions-table.component';
import { DeviceActionsComponent } from './home/main-tables/device-actions/device-actions.component';
import { SoftwareComponent } from './home/main-tables/software/software.component';
import { AddDeviceActionDialogComponent } from './home/main-tables/device-actions/add-device-action-dialog/add-device-action-dialog.component';
import { AddSoftDialogComponent } from './home/main-tables/software/add-soft-dialog/add-soft-dialog.component';
import { SoftwareTypesComponent } from './home/service-tables/software-types/software-types.component';
import { AddSoftComponent } from './home/main-tables/software/add-soft/add-soft.component';
import { AddDeviceActionComponent } from './home/main-tables/device-actions/add-device-action/add-device-action.component';
import { WorkingPositionAutocompleteComponent } from './home/service-tables/working-position-autocomplete/working-position-autocomplete.component';
import { DepartmentAutocompleteComponent } from './home/service-tables/department-autocomplete/department-autocomplete.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ShowDeviceDialogComponent } from './home/main-tables/devices/show-device-dialog/show-device-dialog.component';
import { DeviceComponent } from './home/main-tables/devices/show-device-dialog/device/device.component';


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
    ShowEmployeeDialogComponent,
    ValueWithHeaderComponent,
    ButtonWithHeaderComponent,
    CertsComponent,
    CertsTableComponent,
    DevicesTableComponent,
    DevicesComponent,
    TypesTableComponent,
    DeviceTypesComponent,
    DeviceActionTypesComponent,
    AddTypeDialogComponent,
    AddCertComponent,
    AddCertDialogComponent,
    EmployeesTableComponent,
    AddDeviceComponent,
    AddDeviceDialogComponent,
    SoftwareTableComponent,
    DeviceActionsTableComponent,
    DeviceActionsComponent,
    SoftwareComponent,
    AddDeviceActionDialogComponent,
    AddSoftDialogComponent,
    SoftwareTypesComponent,
    AddSoftComponent,
    AddDeviceActionComponent,
    WorkingPositionAutocompleteComponent,
    DepartmentAutocompleteComponent,
    ShowDeviceDialogComponent,
    DeviceComponent
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
    NgxMaskModule.forRoot(),
    MatExpansionModule,
    NgxMatSelectSearchModule,
    MatAutocompleteModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
