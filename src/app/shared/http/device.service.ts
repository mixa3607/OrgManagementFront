import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IGetAllResult} from '../models/interfaces/i-get-all-result';
import {map} from 'rxjs/operators';
import {IIdNamePair} from '../models/interfaces/i-id-name-pair';
import {IDeviceL} from '../models/list-models/i-device-l';
import {IDeviceDt} from '../models/detailed-models/i-device-dt';
import {IDeviceActionL} from '../models/list-models/i-device-action-l';
import {ISoftwareL} from '../models/list-models/i-software-l';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private readonly managementApiUrl: string;
  private readonly devicesChangeSubject = new Subject();

  public changeObs = this.devicesChangeSubject.pipe();

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  getAll(offset = 0, count = 20): Observable<IGetAllResult<IDeviceL>> {
    return this.http.get<IGetAllResult<IDeviceL>>(`${this.managementApiUrl}/device`,
      {
        params: {offset: offset.toString(), count: count.toString()}
      });
  }

  get(id: number): Observable<IDeviceDt> {
    return this.http.get<IDeviceDt>(`${this.managementApiUrl}/device/${id}`);
  }

  add(device: IDeviceDt): Observable<IDeviceDt> {
    return this.http.post<IDeviceDt>(`${this.managementApiUrl}/device`, device).pipe(
      map(value => {
        this.devicesChangeSubject.next();
        return value;
      }));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.managementApiUrl}/device/${id}`).pipe(
      map(value => {
        this.devicesChangeSubject.next();
        return value;
      })
    );
  }

  search(query: string, offset = 0, count = 10): Observable<IIdNamePair[]> {
    return this.http.get<IIdNamePair[]>(`${this.managementApiUrl}/device/search`, {
      params: {query, offset: offset.toString(), count: count.toString()}
    });
  }

  getActions(id: number, offset = 0, count = 20): Observable<IGetAllResult<IDeviceActionL>> {
    return this.http.get<IGetAllResult<IDeviceActionL>>(`${this.managementApiUrl}/device/${id}/action`, {
      params: {offset: offset.toString(), count: count.toString()}
    });
  }

  getSoft(id: number, offset = 0, count = 20): Observable<IGetAllResult<ISoftwareL>> {
    return this.http.get<IGetAllResult<ISoftwareL>>(`${this.managementApiUrl}/device/${id}/software`, {
      params: {offset: offset.toString(), count: count.toString()}
    });
  }
}
