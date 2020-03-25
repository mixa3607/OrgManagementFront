import {Injectable} from '@angular/core';
import {Observable, of, Subject, throwError} from 'rxjs';
import {IType} from '../models/interfaces/i-type';
import {IGetAllResult} from '../models/interfaces/i-get-all-result';
import {catchError, map, switchMap, take} from 'rxjs/operators';
import {HttpHelper} from './http-helper';
import {IDevice} from '../models/interfaces/i-employee';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceActionService {
  managementApiUrl: string;
  deviceActionsSubject = new Subject<IDevice[]>();

  private inTypesGetting = false;
  private typeGettingSubject = new Subject<any>();
  private types = new Map<number, IType>();
  typesSubject = new Subject<IType[]>();

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  getAllTypes(): Observable<IType[]> {
    this.inTypesGetting = true;
    return this.http.get<IGetAllResult<IType>>(`${this.managementApiUrl}/deviceActionType`).pipe(
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
    return this.http.delete<any>(`${this.managementApiUrl}/deviceActionType/${id}`).pipe(
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
