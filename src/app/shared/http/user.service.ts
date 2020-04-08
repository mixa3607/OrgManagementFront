import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FingerprintService} from '../services/fingerprint.service';
import {environment} from '../../../environments/environment';
import {IAuthUser} from '../models/interfaces/i-auth-user';
import {Router} from '@angular/router';
import {EApiErrorTypes} from '../models/eapi-error-types.enum';
import {ApiError} from '../models/classes/api-error';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  managementApiUrl: string;
  authApiUrl: string;
  fingerprint: string;

  constructor(private http: HttpClient,
              private fingerprintService: FingerprintService,
              private router: Router) {
    this.authApiUrl = environment.authApiUrl;
    this.managementApiUrl = environment.managementApiUrl;
    this.fingerprint = fingerprintService.getFingerprint();
  }

  checkUserAuth(): Observable<any> {
    return this.http.get(this.authApiUrl + '/authCheck/user');
  }

  checkAdminAuth(): Observable<any> {
    return this.http.get(this.authApiUrl + '/authCheck/admin');
  }


  updateTokens(): Observable<IAuthUser> {
    if (this.refreshToken) {
      return this.http.get<IAuthUser>(this.authApiUrl + '/user/refreshToken', {
        params: {
          refreshToken: this.refreshToken,
          fingerprint: this.fingerprint,
        }
      }).pipe(map(value => {
        this.jwtToken = value.jwtToken;
        this.refreshToken = value.refreshToken;
        console.debug('Update tokens successful');
        return value;
      }));
    } else {
      return throwError(new ApiError(EApiErrorTypes.Forbid));
    }
  }

  passChallenge(user: IAuthUser, phrase: string): Observable<any> {
    return this.http.put(this.authApiUrl + '/user/challenge', {
      userName: user.userName,
      password: user.password,
      challenge: phrase,
    }).pipe(map(value => {
      console.debug('Challenge successful passed');
      return value;
    }));
  }

  login(user: IAuthUser): Observable<IAuthUser> {
    return this.http.get<IAuthUser>(this.authApiUrl + '/user/login', {
      params: {
        userName: user.userName,
        password: user.password,
        fingerprint: this.fingerprint
      }
    }).pipe(map(value => {
      console.debug('successful login');
      this.setUser(value);
      return value;
    }));
  }

  logout(): Observable<any> {
    return this.http.delete(this.authApiUrl + '/user/logout', {
      params: {refreshToken: this.refreshToken}
    }).pipe(map(value => {
      this.jwtToken = '';
      this.refreshToken = '';
      console.debug('Successful logout');
      this.router.navigate(['/auth']);
      return value;
    }));
  }

  registry(user: IAuthUser): Observable<any> {
    return this.http.post(this.authApiUrl + '/user',
      {
        fingerprint: this.fingerprint,
        userName: user.userName,
        password: user.password,
      }
    ).pipe(map(value => {
      console.debug('Registration success');
      return value;
    }));
  }

  private getUser(): IAuthUser {
    return {
      jwtToken: this.jwtToken,
      password: '',
      refreshToken: this.refreshToken,
      userName: this.userName
    };
  }

  public setUser(user: IAuthUser): void {
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
