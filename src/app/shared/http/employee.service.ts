import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {IEmployee} from '../models/interfaces/i-employee';
import {IGetAllResult} from '../models/interfaces/i-get-all-result';
import {HttpHelper} from './http-helper';
import {catchError, map} from 'rxjs/operators';
import {EChangeActionType, IChangeAction} from '../models/i-act';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  managementApiUrl: string;

  employeesSubject = new Subject<IChangeAction<IEmployee | number>>();

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  getAll(): Observable<IEmployee[]> {
    return this.http.get<IGetAllResult<IEmployee>>(this.managementApiUrl + '/employee').pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(HttpHelper.HandleHttpError(err));
      }),
      map(value => {
        value.values.forEach(val =>
          this.employeesSubject.next({value: val, type: EChangeActionType.ADD})
        );
        return value.values;
      })
    );
  }

  addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.put<IEmployee>(this.managementApiUrl + '/employee', employee).pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(HttpHelper.HandleHttpError(err));
      })
    );
  }

  delEmployee(id: number): Observable<any> {
    return this.http.delete(this.managementApiUrl + '/employee/' + id).pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(HttpHelper.HandleHttpError(err));
      }),
      map(value => {
        this.employeesSubject.next({value: id, type: EChangeActionType.DEL});
        return value;
      })
    );
  }

  getEmployee(id: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.managementApiUrl + '/employee/' + id).pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(HttpHelper.HandleHttpError(err));
      })
    );
  }
}
