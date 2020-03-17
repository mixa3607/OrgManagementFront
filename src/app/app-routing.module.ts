import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {HomeGuard} from './shared/guards/home.guard';


const routes: Routes = [{path: 'auth', component: AuthComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [HomeGuard]},
  {path: '**', redirectTo: '/auth'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
