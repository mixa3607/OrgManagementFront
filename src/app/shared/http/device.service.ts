import {Injectable} from '@angular/core';
import {Observable, of, Subject, throwError} from 'rxjs';
import {IDevice} from '../models/interfaces/i-employee';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IGetAllResult} from '../models/interfaces/i-get-all-result';
import {catchError, map, switchMap, take} from 'rxjs/operators';
import {HttpHelper} from './http-helper';
import {IType} from '../models/interfaces/i-type';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  managementApiUrl: string;
  devicesSubject = new Subject<IDevice[]>();

  private inTypesGetting = false;
  private typeGettingSubject = new Subject<any>();
  private types = new Map<number, IType>();
  typesSubject = new Subject<IType[]>();

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  getAll(): Observable<IDevice[]> {
    return this.http.get<IGetAllResult<IDevice>>(`${this.managementApiUrl}/device`).pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(HttpHelper.HandleHttpError(err));
      }),
      map(value => {
        this.devicesSubject.next(value.values);
        return value.values;
      }));
  }

  getAllTypes(): Observable<IType[]> {
    this.inTypesGetting = true;
    return this.http.get<IGetAllResult<IType>>(`${this.managementApiUrl}/deviceType`).pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        this.inTypesGetting = false;
        return throwError(HttpHelper.HandleHttpError(err));
      }),
      map(value => {
        this.typesSubject.next(value.values);
        value.values.forEach(x => this.types.set(x.id, x));
        this.inTypesGetting = false;
        this.typeGettingSubject.next(null);
        return value.values;
      }));
  }

  getType(id: number): Observable<string> {
    if (this.inTypesGetting) {
      return this.typeGettingSubject.pipe(
        take(1),
        switchMap(value => this.types.get(id).name));
    } else if (this.types.size === 0) {
      return this.getAllTypes().pipe(map(value => {
        return this.types.get(id)?.name;
      }));
    } else {
      return of(this.types.get(id).name);
    }
  }

  delType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.managementApiUrl}/deviceType/${id}`).pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(HttpHelper.HandleHttpError(err));
      }),
      map(value => {
      this.getAllTypes().subscribe();
      return value;
    }));
  }

  addType(name: string): Observable<any> {
    return this.http.put<any>(`${this.managementApiUrl}/deviceType`, JSON.stringify(name), {
      headers: {'Content-Type': 'application/json'}
    }).pipe(
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(HttpHelper.HandleHttpError(err));
      }),
      map(value => {
        this.getAllTypes().subscribe();
        return value;
      }));
  }
}
