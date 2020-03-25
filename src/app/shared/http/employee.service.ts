import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {IEmployee} from '../models/interfaces/i-employee';
import {IGetAllResult} from '../models/interfaces/i-get-all-result';
import {HttpHelper} from './http-helper';
import {catchError, map} from 'rxjs/operators';
import {IEmployeeUpdate} from '../models/update/i-employee-update';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  managementApiUrl: string;

  employeesSubject = new Subject<IEmployee[]>();

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
        this.employeesSubject.next(value.values);
        return value.values;
      })
    );
  }

  addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.put<IEmployee>(this.managementApiUrl + '/employee', employee).pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(HttpHelper.HandleHttpError(err));
      }),
      map(value => {
        this.getAll().subscribe();
        return value;
      })
    );
  }

  delEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.managementApiUrl}/employee/${id}`).pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(HttpHelper.HandleHttpError(err));
      }),
      map(value => {
        this.getAll().subscribe();
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

  updateEmployee(id: number, upd: IEmployeeUpdate): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.managementApiUrl + '/employee/' + id, upd).pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(HttpHelper.HandleHttpError(err));
      }),
      map(value => {
        this.getAll().subscribe();
        return value;
      })
    );
  }
}
