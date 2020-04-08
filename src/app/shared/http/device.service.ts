import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IGetAllResult} from '../models/interfaces/i-get-all-result';
import {map, switchMap, take} from 'rxjs/operators';
import {IIdNamePair} from '../models/interfaces/i-id-name-pair';
import {IDeviceL} from '../models/list-models/i-device-l';
import {IEmployeeDt} from '../models/detailed-models/i-employee-dt';
import {IDeviceDt} from '../models/detailed-models/i-device-dt';
import {ISoftwareL} from '../models/list-models/i-software-l';
import {ISoftwareDt} from '../models/detailed-models/i-software-dt';
import {IDeviceActionDt} from '../models/detailed-models/i-device-action-dt';
import {SoftwareService} from './software.service';
import {DeviceActionService} from './device-action.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private readonly managementApiUrl: string;

  private inTypesGetting = false;
  private typeGettingSubject = new Subject<any>();
  private types = new Map<number, IIdNamePair>();

  public readonly typesChangeSubject = new Subject();
  public readonly devicesChangeSubject = new Subject();

  constructor(private http: HttpClient, private softwareService: SoftwareService, private deviceActionService: DeviceActionService) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  getAll(offset = 0, count = 20): Observable<IGetAllResult<IDeviceL>> {
    return this.http.get<IGetAllResult<IDeviceL>>(`${this.managementApiUrl}/device`,
      {
        params: {offset: offset.toString(), count: count.toString()}
      });
  }

  delDevice(id: number): Observable<any> {
    return this.http.delete(`${this.managementApiUrl}/device/${id}`).pipe(
      map(value => {
        this.devicesChangeSubject.next();
        return value;
      })
    );
  }

  addSoft(deviceId: number, soft: ISoftwareDt): Observable<ISoftwareDt> {
    return this.http.post<ISoftwareDt>(this.managementApiUrl + '/device/' + deviceId + '/software', soft).pipe(
      map(value => {
        this.softwareService.softwareChangeSubject.next();
        return value;
      })
    );
  }

  addAction(deviceId: number, soft: IDeviceActionDt): Observable<IDeviceDt> {
    return this.http.post<IDeviceDt>(this.managementApiUrl + '/device/' + deviceId + '/action', soft).pipe(
      map(value => {
        this.deviceActionService.deviceActionsChangeSubject.next();
        return value;
      })
    );
  }

  search(query: string, offset = 0, count = 10): Observable<IIdNamePair[]> {
    return this.http.get<IEmployeeDt[]>(this.managementApiUrl + '/device/search', {
      params: {query, offset: offset.toString(), count: count.toString()}
    });
  }

  getAllTypes(offset = 0, count = 20): Observable<IGetAllResult<IIdNamePair>> {
    return this.http.get<IGetAllResult<IIdNamePair>>(`${this.managementApiUrl}/deviceType`,
      {
        params: {offset: offset.toString(), count: count.toString()}
      }).pipe(
      map(value => {
        value.values.forEach(x => this.types.set(x.id, x));
        this.inTypesGetting = false;
        return value;
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
      map(value => {
        this.typesChangeSubject.next();
        return value;
      }));
  }

  addType(name: string): Observable<any> {
    return this.http.post<any>(`${this.managementApiUrl}/deviceType`, JSON.stringify(name)).pipe(
      map(value => {
        this.typesChangeSubject.next();
        return value;
      }));
  }
}
