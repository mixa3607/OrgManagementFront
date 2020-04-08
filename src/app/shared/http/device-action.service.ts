import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IIdNamePair} from '../models/interfaces/i-id-name-pair';
import {IGetAllResult} from '../models/interfaces/i-get-all-result';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IDeviceActionL} from '../models/list-models/i-device-action-l';

@Injectable({
  providedIn: 'root'
})
export class DeviceActionService {
  private readonly managementApiUrl: string;

  private inTypesGetting = false;
  private typeGettingSubject = new Subject<any>();
  private types = new Map<number, IIdNamePair>();

  public readonly typesChangeSubject = new Subject();
  public readonly deviceActionsChangeSubject = new Subject();

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  getAll(offset = 0, count = 20): Observable<IGetAllResult<IDeviceActionL>> {
    return this.http.get<IGetAllResult<IDeviceActionL>>(`${this.managementApiUrl}/deviceAction`,
      {
        params: {offset: offset.toString(), count: count.toString()}
      });
  }

  del(id: number): Observable<any> {
    return this.http.delete(`${this.managementApiUrl}/deviceAction/${id}`).pipe(
      map(value => {
        this.deviceActionsChangeSubject.next();
        return value;
      }));
  }


  getAllTypes(): Observable<IGetAllResult<IIdNamePair>> {
    this.inTypesGetting = true;
    return this.http.get<IGetAllResult<IIdNamePair>>(`${this.managementApiUrl}/deviceActionType`).pipe(
      map(value => {
        value.values.forEach(x => this.types.set(x.id, x));
        this.inTypesGetting = false;
        this.typeGettingSubject.next(null);
        return value;
      }));
  }

  delType(id: number): Observable<any> {
    return this.http.delete<any>(`${this.managementApiUrl}/deviceActionType/${id}`).pipe(
      map(value => {
        this.typesChangeSubject.next();
        return value;
      }));
  }

  addType(name: string): Observable<any> {
    return this.http.post<any>(`${this.managementApiUrl}/deviceActionType`, JSON.stringify(name)).pipe(
      map(value => {
        this.typesChangeSubject.next();
        return value;
      }));
  }
}
