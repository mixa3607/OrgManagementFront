import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {IEmployeeDt} from '../models/detailed-models/i-employee-dt';
import {IGetAllResult} from '../models/interfaces/i-get-all-result';
import {map, switchMap, take} from 'rxjs/operators';
import {IEmployeeUpdate} from '../models/update/i-employee-update';
import {IEmployeeL} from '../models/list-models/i-employee-l';
import {IIdNamePair} from '../models/interfaces/i-id-name-pair';
import {IDeviceL} from '../models/list-models/i-device-l';
import {ICertL} from '../models/list-models/i-cert-l';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly managementApiUrl: string;

  private readonly employeeCache = new Map<number, IEmployeeDt>();
  private inGetEmployee = false;
  private gettingEmployeeId = 0;
  private readonly getEmployeeSubject = new Subject<IEmployeeDt>();

  public readonly employeesChangedSubject = new Subject();

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  getAll(offset = 0, count = 20): Observable<IGetAllResult<IEmployeeL>> {
    return this.http.get<IGetAllResult<IEmployeeL>>(`${this.managementApiUrl}/employee`, {
      params: {offset: offset.toString(), count: count.toString()}
    });
  }

  add(employee: IEmployeeDt): Observable<IEmployeeDt> {
    return this.http.post<IEmployeeDt>(`${this.managementApiUrl}/employee`, employee).pipe(
      map(value => {
        this.employeesChangedSubject.next();
        return value;
      })
    );
  }

  del(id: number): Observable<any> {
    return this.http.delete(`${this.managementApiUrl}/employee/${id}`).pipe(
      map(value => {
        this.employeesChangedSubject.next();
        return value;
      })
    );
  }

  get(id: number): Observable<IEmployeeDt> {
    const empl = this.employeeCache.get(id);
    if (empl) {
      return of(empl);
    } else if (this.inGetEmployee) {
      if (this.gettingEmployeeId === id) {
        return this.getEmployeeSubject.pipe(
          take(1),
          switchMap(value => of(value))
        );
      } else {
        return this.getEmployeeSubject.pipe(
          take(1),
          switchMap(() => this.get(id))
        );
      }
    } else {
      this.gettingEmployeeId = id;
      this.inGetEmployee = true;
      return this.http.get<IEmployeeDt>(`${this.managementApiUrl}/employee/${id}`).pipe(map(value => {
        this.employeeCache.set(value.id, value);
        this.inGetEmployee = false;
        this.getEmployeeSubject.next(value);
        return value;
      }));
    }
  }

  update(id: number, upd: IEmployeeUpdate): Observable<IEmployeeDt> {
    return this.http.put<IEmployeeDt>(`${this.managementApiUrl}/employee/${id}`, upd).pipe(
      map(value => {
        this.employeesChangedSubject.next();
        return value;
      })
    );
  }

  search(query: string, offset = 0, count = 10): Observable<IIdNamePair[]> {
    return this.http.get<IEmployeeDt[]>(`${this.managementApiUrl}/employee/search`, {
      params: {query, offset: offset.toString(), count: count.toString()}
    });
  }

  getDevices(id: number, offset = 0, count = 20): Observable<IGetAllResult<IDeviceL>> {
    return this.http.get<IGetAllResult<IDeviceL>>(`${this.managementApiUrl}/employee/${id}/device`, {
      params: {offset: offset.toString(), count: count.toString()}
    });
  }

  getCerts(id: number, offset = 0, count = 20): Observable<IGetAllResult<ICertL>> {
    return this.http.get<IGetAllResult<ICertL>>(`${this.managementApiUrl}/employee/${id}/cert`, {
      params: {offset: offset.toString(), count: count.toString()}
    });
  }
}
