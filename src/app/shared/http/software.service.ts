import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {IIdNamePair} from '../models/interfaces/i-id-name-pair';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IGetAllResult} from '../models/interfaces/i-get-all-result';
import {map, switchMap, take} from 'rxjs/operators';
import {ISoftwareL} from '../models/list-models/i-software-l';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {
  private readonly managementApiUrl: string;

  private inTypesGetting = false;
  private typeGettingSubject = new Subject<any>();
  private types = new Map<number, IIdNamePair>();

  public readonly typesChangeSubject = new Subject();
  public readonly softwareChangeSubject = new Subject();

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  getAll(offset = 0, count = 20): Observable<IGetAllResult<ISoftwareL>> {
    return this.http.get<IGetAllResult<ISoftwareL>>(`${this.managementApiUrl}/software`,
      {
        params: {offset: offset.toString(), count: count.toString()}
      });
  }

  del(id: number): Observable<any> {
    return this.http.delete(`${this.managementApiUrl}/software/${id}`).pipe(
      map(value => {
        this.softwareChangeSubject.next();
        return value;
      }));
  }


  getAllTypes(offset = 0, count = 20): Observable<IGetAllResult<IIdNamePair>> {
    return this.http.get<IGetAllResult<IIdNamePair>>(`${this.managementApiUrl}/softwareType`,
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
    return this.http.delete<any>(`${this.managementApiUrl}/softwareType/${id}`).pipe(
      map(value => {
        this.typesChangeSubject.next();
        return value;
      }));
  }

  addType(name: string): Observable<any> {
    return this.http.post<any>(`${this.managementApiUrl}/softwareType`, JSON.stringify(name)).pipe(
      map(value => {
        this.typesChangeSubject.next();
        return value;
      }));
  }
}
