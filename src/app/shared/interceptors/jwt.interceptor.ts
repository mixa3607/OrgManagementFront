import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {UserService} from '../http/user.service';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {EApiErrorTypes} from '../models/eapi-error-types.enum';
import {ApiError} from '../models/classes/api-error';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public userService: UserService) {
  }

  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<any>(null);


  private static addToken(request: HttpRequest<any>, token: string) {
    const headers = { Authorization: `Bearer ${token}` }
    if (!request.headers.get('Content-Type-Internal')) {
      headers['Content-Type'] ='application/json';
    }
    return request.clone({
      setHeaders: headers
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.userService.jwtToken) {
      request = JwtInterceptor.addToken(request, this.userService.jwtToken);
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof ApiError && error.errorType === EApiErrorTypes.Unauthorized) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.userService.updateTokens().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(this.userService.jwtToken);
          return next.handle(JwtInterceptor.addToken(request, this.userService.jwtToken));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(JwtInterceptor.addToken(request, jwt));
        }));
    }
  }
}
