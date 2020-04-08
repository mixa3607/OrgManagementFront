import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../http/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      this.userService.checkAdminAuth().subscribe(value => {
        this.router.navigate(['/home/employee']);
        subscriber.next(false);
      }, error => {
        subscriber.next(true);
      });
    });
  }

}
