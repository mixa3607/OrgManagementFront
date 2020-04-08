import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {IEmployeeDt} from '../models/detailed-models/i-employee-dt';
import {IGetAllResult} from '../models/interfaces/i-get-all-result';
import {map, switchMap, take} from 'rxjs/operators';
import {IEmployeeUpdate} from '../models/update/i-employee-update';
import {CertService} from './cert.service';
import {ICertDt} from '../models/detailed-models/i-cert-dt';
import {IEmployeeL} from '../models/list-models/i-employee-l';
import {IIdNamePair} from '../models/interfaces/i-id-name-pair';
import {IDeviceDt} from '../models/detailed-models/i-device-dt';
import {DeviceService} from './device.service';

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

  constructor(private http: HttpClient,
              private certService: CertService,
              private deviceService:DeviceService) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  getAll(offset = 0, count = 20): Observable<IGetAllResult<IEmployeeL>> {
    return this.http.get<IGetAllResult<IEmployeeL>>(this.managementApiUrl + '/employee', {
      params: {offset: offset.toString(), count: count.toString()}
    });
  }

  addEmployee(employee: IEmployeeDt): Observable<IEmployeeDt> {
    return this.http.post<IEmployeeDt>(this.managementApiUrl + '/employee', employee).pipe(
      map(value => {
        this.employeesChangedSubject.next();
        return value;
      })
    );
  }

  delEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.managementApiUrl}/employee/${id}`).pipe(
      map(value => {
        this.employeesChangedSubject.next();
        return value;
      })
    );
  }

  getEmployee(id: number): Observable<IEmployeeDt> {
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
          switchMap(() => this.getEmployee(id))
        );
      }
    } else {
      this.gettingEmployeeId = id;
      this.inGetEmployee = true;
      return this.http.get<IEmployeeDt>(this.managementApiUrl + '/employee/' + id).pipe(map(value => {
        this.employeeCache.set(value.id, value);
        this.inGetEmployee = false;
        this.getEmployeeSubject.next(value);
        return value;
      }));
    }
  }

  updateEmployee(id: number, upd: IEmployeeUpdate): Observable<IEmployeeDt> {
    return this.http.put<IEmployeeDt>(this.managementApiUrl + '/employee/' + id, upd).pipe(
      map(value => {
        this.employeesChangedSubject.next();
        return value;
      })
    );
  }

  search(query: string, offset = 0, count = 10): Observable<IIdNamePair[]> {
    return this.http.get<IEmployeeDt[]>(this.managementApiUrl + '/employee/search', {
      params: {query, offset: offset.toString(), count: count.toString()}
    });
  }

  addCert(employeeId: number, cert: ICertDt): Observable<ICertDt> {
    return this.http.post<ICertDt>(`${this.managementApiUrl}/employee/${employeeId}/cert`, cert).pipe(
      map(value => {
        this.certService.certsChangedSubject.next();
        return value;
      }));
  }

  addDevice(employeeId: number, device: IDeviceDt): Observable<IDeviceDt> {
    return this.http.post<IDeviceDt>(`${this.managementApiUrl}/employee/${employeeId}/device`, device).pipe(
      map(value => {
        this.deviceService.devicesChangeSubject.next();
        return value;
      }));
  }
}
