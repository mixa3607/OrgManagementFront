import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IGetAllResult} from '../models/interfaces/i-get-all-result';
import {map} from 'rxjs/operators';
import {ICertL} from '../models/list-models/i-cert-l';

@Injectable({
  providedIn: 'root'
})
export class CertService {
  private readonly managementApiUrl: string;

  public readonly certsChangedSubject = new Subject();

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  getAll(offset = 0, count = 20): Observable<IGetAllResult<ICertL>> {
    return this.http.get<IGetAllResult<ICertL>>(`${this.managementApiUrl}/cert`,
      {
        params: {offset: offset.toString(), count: count.toString()}
      });
  }

  del(id: number): Observable<any> {
    return this.http.delete(`${this.managementApiUrl}/cert/${id}`).pipe(
      map(value => {
        this.certsChangedSubject.next();
        return value;
      }));
  }
}
