import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ITaxIdUpdate} from '../models/update/i-employee-update';
import {Observable, throwError} from 'rxjs';
import {IPassport, ITaxId} from '../models/interfaces/i-employee';
import {catchError} from 'rxjs/operators';
import {HttpHelper} from './http-helper';

@Injectable({
  providedIn: 'root'
})
export class TaxIdService {
  managementApiUrl: string;

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  update(id: number, upd: ITaxIdUpdate): Observable<ITaxId> {
    return this.http.post<IPassport>(this.managementApiUrl + '/taxId/' + id, upd).pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(HttpHelper.HandleHttpError(err));
      })
    );
  }
}
