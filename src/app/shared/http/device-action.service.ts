import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IGetAllResult} from '../models/interfaces/i-get-all-result';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IDeviceActionL} from '../models/list-models/i-device-action-l';
import {IDeviceActionDt} from '../models/detailed-models/i-device-action-dt';

@Injectable({
  providedIn: 'root'
})
export class DeviceActionService {
  private readonly managementApiUrl: string;
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

  add(deviceAction: IDeviceActionDt): Observable<IDeviceActionDt> {
    return this.http.post<IDeviceActionDt>(`${this.managementApiUrl}/deviceAction`, deviceAction).pipe(
      map(value => {
        this.deviceActionsChangeSubject.next();
        return value;
      })
    );
  }

  del(id: number): Observable<any> {
    return this.http.delete(`${this.managementApiUrl}/deviceAction/${id}`).pipe(
      map(value => {
        this.deviceActionsChangeSubject.next();
        return value;
      }));
  }
}
