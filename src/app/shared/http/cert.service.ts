import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IGetAllResult} from '../models/interfaces/i-get-all-result';
import {map} from 'rxjs/operators';
import {ICertL} from '../models/list-models/i-cert-l';
import {ICertDt} from '../models/detailed-models/i-cert-dt';

@Injectable({
  providedIn: 'root'
})
export class CertService {
  private readonly managementApiUrl: string;
  private readonly certsChangedSubject = new Subject();

  public changeObs = this.certsChangedSubject.pipe();

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  getAll(offset = 0, count = 40): Observable<IGetAllResult<ICertL>> {
    return this.http.get<IGetAllResult<ICertL>>(`${this.managementApiUrl}/cert`,
      {
        params: {offset: offset.toString(), count: count.toString()}
      });
  }

  add(cert: ICertDt): Observable<ICertDt> {
    return this.http.post<ICertDt>(`${this.managementApiUrl}/cert`, cert).pipe(
      map(value => {
        this.certsChangedSubject.next();
        return value;
      }));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.managementApiUrl}/cert/${id}`).pipe(
      map(value => {
        this.certsChangedSubject.next();
        return value;
      }));
  }
}
