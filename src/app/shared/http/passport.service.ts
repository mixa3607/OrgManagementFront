import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {IPassport} from '../models/interfaces/i-employee';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IPassportUpdate} from '../models/update/i-employee-update';
import {catchError} from 'rxjs/operators';
import {HttpHelper} from './http-helper';

@Injectable({
  providedIn: 'root'
})
export class PassportService {
  managementApiUrl: string;

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  update(id: number, upd: IPassportUpdate): Observable<IPassport> {
    return this.http.post<IPassport>(this.managementApiUrl + '/passport/' + id, upd).pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(HttpHelper.HandleHttpError(err));
      })
    );
  }
}
