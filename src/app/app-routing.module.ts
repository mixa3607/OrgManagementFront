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


const routes: Routes = [{path: 'auth', component: AuthComponent, canActivate: [AuthGuard]},
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [HomeGuard],
    // redirectTo: 'employee',
    children: [
      {path: 'employee', component: EmployeesComponent},
      {path: 'cert', component: CertsComponent},
      {path: 'device', component: DevicesComponent},
      {path: 'deviceType', component: DeviceTypesComponent},
      {path: 'deviceActionType', component: DeviceActionTypesComponent}
    ]
  },
  {path: '**', redirectTo: '/auth'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
