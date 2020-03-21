import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      this.userService.checkAdminAuth().subscribe(value => {
        subscriber.next(true);
      }, error => {
        this.router.navigate(['/auth']);
        subscriber.next(false);
      })
    })
  }
}
