import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {EUserSessionState} from '../models/euser-session-state.enum';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FingerprintService} from './fingerprint.service';
import {environment} from '../../../environments/environment';
import {IUser} from '../models/interfaces/i-user';
import {HttpHelper} from '../http/http-helper';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  managementApiUrl: string;
  authApiUrl: string;
  fingerprint: string;
  // sessionBehavior: BehaviorSubject<EUserSessionState>;
  constructor(private http: HttpClient,
              private fingerprintService: FingerprintService,
              private router: Router) {
    this.authApiUrl = environment.authApiUrl;
    this.managementApiUrl = environment.managementApiUrl;
    this.fingerprint = fingerprintService.getFingerprint();
  }

  logout(): Observable<string> {
    const apiCall = this.http.delete(this.authApiUrl + '/user/logout', {
      params: {refreshToken: this.refreshToken},
      // headers: {Authorization: 'Bearer ' + this.jwtToken}
    });
    return new Observable(subscriber => {
      apiCall.subscribe(value => {
        this.jwtToken = '';
        this.refreshToken = '';
        console.debug('Successful logout');
        this.router.navigate(['/auth']);
        subscriber.next('ok');
      }, (error: HttpErrorResponse) => {
        subscriber.error(HttpHelper.HandleHttpError(error));
      });
    });
  }

  registry(user: IUser): Observable<any> {
    const apiCall = this.http.put(this.authApiUrl + '/user/registration',
      {
        fingerprint: this.fingerprint,
        userName: user.userName,
        password: user.password,
      }
    );
    return new Observable<string>(subscriber => {
      apiCall.subscribe(value => {
        console.debug('Registration success');
        subscriber.next('ok');
      }, (error: HttpErrorResponse) => {
        subscriber.error(HttpHelper.HandleHttpError(error));
      });
    });
  }

  checkUserAuth(): Observable<any> {
    const apiCall = this.http.get(this.authApiUrl + '/authCheck/user', {
      // headers: this.bearerHeader
    });
    return new Observable<string>(subscriber => {
      apiCall.subscribe(value => {
        subscriber.next('ok');
      }, (error: HttpErrorResponse) => {
        subscriber.error(HttpHelper.HandleHttpError(error, true));
      });
    });
  }
  checkAdminAuth(): Observable<any> {
    const apiCall = this.http.get(this.authApiUrl + '/authCheck/admin', {
      // headers: this.bearerHeader
    });
    return new Observable<string>(subscriber => {
      apiCall.subscribe(value => {
        subscriber.next('ok');
      }, (error: HttpErrorResponse) => {
        subscriber.error(HttpHelper.HandleHttpError(error, true));
      });
    });
  }

  updateTokens(): Observable<string> {
    const apiCall = this.http.get(this.authApiUrl + '/user/refreshToken', {
      params: {
        refreshToken: this.refreshToken,
        fingerprint: this.fingerprint,
      }
    });
    return new Observable(subscriber => {
      apiCall.subscribe((user: IUser) => {
        this.jwtToken = user.jwtToken;
        this.refreshToken = user.refreshToken;
        subscriber.next('ok');
        console.debug('Update tokens successful');
      }, (error: HttpErrorResponse) => {
        subscriber.error(HttpHelper.HandleHttpError(error));
      });
    });
  }

  passChallenge(user: IUser, phrase: string): Observable<string> {
    const apiCall = this.http.post(this.authApiUrl + '/user/challenge', {
      userName: user.userName,
      password: user.password,
      challenge: phrase,
    });
    return new Observable<string>(subscriber => {
      apiCall.subscribe(value => {
        console.debug('Challenge successful passed');
        subscriber.next('ok');
      }, (error: HttpErrorResponse) => {
        subscriber.error(HttpHelper.HandleHttpError(error));
      });
    });
  }

  login(user: IUser): Observable<IUser> {
    const apiCall = this.http.get(this.authApiUrl + '/user/login', {
      params: {
        userName: user.userName,
        password: user.password,
        fingerprint: this.fingerprint
      }
    });
    return new Observable(subscriber => {
      apiCall.subscribe((value:IUser) => {
        console.debug('successful login');
        this.setUser(value);
        subscriber.next(value);
      }, (error: HttpErrorResponse) => {
        subscriber.error(HttpHelper.HandleHttpError(error, true));
      });
    });
  }

  private getUser(): IUser {
    return {
      jwtToken: this.jwtToken,
      password: '',
      refreshToken: this.refreshToken,
      userName: this.userName
    };
  }
  public setUser(user: IUser): void {
    this.userName = user.userName;
    this.jwtToken = user.jwtToken;
    this.refreshToken = user.refreshToken;
  }
  set jwtToken(value: string) {
    localStorage.setItem('jwtToken', value);
  }

  get jwtToken(): string {
    return localStorage.getItem('jwtToken');
  }

  set password(value: string) {
    throw new Error('Not savable');
  }

  get password(): string {
    return null;
  }

  set refreshToken(value: string) {
    localStorage.setItem('refreshToken', value);
  }

  get refreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  set userName(value: string) {
    localStorage.setItem('userName', value);
  }

  get userName(): string {
    return localStorage.getItem('userName');
  }

  get bearerHeader(): { Authorization: string } {
    return {Authorization: 'Bearer ' + this.jwtToken};
  }
}
