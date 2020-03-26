import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {ICert} from '../models/interfaces/i-employee';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IGetAllResult} from '../models/interfaces/i-get-all-result';
import {catchError, map} from 'rxjs/operators';
import {HttpHelper} from './http-helper';

@Injectable({
  providedIn: 'root'
})
export class CertService {
  managementApiUrl: string;
  certsSubject = new Subject<ICert[]>();

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  getAll(): Observable<ICert[]> {
    return this.http.get<IGetAllResult<ICert>>(`${this.managementApiUrl}/cert`).pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(HttpHelper.HandleHttpError(err));
      }),
      map(value => {
        this.certsSubject.next(value.values);
        return value.values;
      }));
  }

  del(id:number):Observable<any> {
    return this.http.delete(`${this.managementApiUrl}/cert/${id}`).pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(HttpHelper.HandleHttpError(err));
      }),
      map(value => {
        this.getAll().subscribe();
        return value;
      }));
  }
}
