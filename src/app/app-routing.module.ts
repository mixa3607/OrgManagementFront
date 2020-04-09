import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {HomeGuard} from './shared/guards/home.guard';
import {EmployeesComponent} from './home/main-tables/employees/employees.component';
import {CertsComponent} from './home/main-tables/certs/certs.component';
import {DevicesComponent} from './home/main-tables/devices/devices.component';
import {DeviceTypesComponent} from './home/service-tables/device-types/device-types.component';
import {DeviceActionTypesComponent} from './home/service-tables/device-action-types/device-action-types.component';
import {SoftwareTypesComponent} from './home/service-tables/software-types/software-types.component';
import {SoftwareComponent} from './home/main-tables/software/software.component';
import {DeviceActionsComponent} from './home/main-tables/device-actions/device-actions.component';
import {WorkingPositionAutocompleteComponent} from './home/service-tables/working-position-autocomplete/working-position-autocomplete.component';
import {DepartmentAutocompleteComponent} from './home/service-tables/department-autocomplete/department-autocomplete.component';


const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [HomeGuard],
    children: [
      {path: 'employee', component: EmployeesComponent},
      {path: 'cert', component: CertsComponent},
      {path: 'device', component: DevicesComponent},
      {path: 'software', component: SoftwareComponent},
      {path: 'deviceAction', component: DeviceActionsComponent},
      {path: 'deviceType', component: DeviceTypesComponent},
      {path: 'deviceActionType', component: DeviceActionTypesComponent},
      {path: 'softwareType', component: SoftwareTypesComponent},
      {path: 'workingPositionAc', component: WorkingPositionAutocompleteComponent},
      {path: 'departmentAc', component: DepartmentAutocompleteComponent},
    ]
  },
  {path: '**', redirectTo: '/auth'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
