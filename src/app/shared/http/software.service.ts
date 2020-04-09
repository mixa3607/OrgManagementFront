import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IGetAllResult} from '../models/interfaces/i-get-all-result';
import {map} from 'rxjs/operators';
import {ISoftwareL} from '../models/list-models/i-software-l';
import {ISoftwareDt} from '../models/detailed-models/i-software-dt';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {
  private readonly managementApiUrl: string;
  private readonly softwareChangeSubject = new Subject();

  public changeObs = this.softwareChangeSubject.pipe();

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  getAll(offset = 0, count = 20): Observable<IGetAllResult<ISoftwareL>> {
    return this.http.get<IGetAllResult<ISoftwareL>>(`${this.managementApiUrl}/software`,
      {
        params: {offset: offset.toString(), count: count.toString()}
      });
  }

  add(soft: ISoftwareDt): Observable<ISoftwareDt> {
    return this.http.post<ISoftwareDt>(`${this.managementApiUrl}/software`, soft).pipe(
      map(value => {
        this.softwareChangeSubject.next();
        return value;
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.managementApiUrl}/software/${id}`).pipe(
      map(value => {
        this.softwareChangeSubject.next();
        return value;
      }));
  }
}
