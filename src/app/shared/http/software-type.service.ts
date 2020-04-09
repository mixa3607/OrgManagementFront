import { Injectable } from '@angular/core';
import {TypesGetMgr} from './types-get-mgr';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IIdNamePair} from '../models/interfaces/i-id-name-pair';

@Injectable({
  providedIn: 'root'
})
export class SoftwareTypeService {
  private readonly tMgr: TypesGetMgr;
  public changeObs: Observable<unknown>;

  constructor(private http: HttpClient) {
    this.tMgr = new TypesGetMgr(http, `${environment.managementApiUrl}/softwareType`);
    this.changeObs = this.tMgr.typesChangedObs;
  }

  getAll(): Observable<IIdNamePair[]> {
    return this.tMgr.getAll();
  }

  get(id: number): Observable<IIdNamePair> {
    return this.tMgr.get(id);
  }

  add(name:string): Observable<any>{
    return this.tMgr.add(name);
  }

  delete(id: number): Observable<any> {
    return this.tMgr.delete(id);
  }

  public flush(): void {
    this.tMgr.flush();
  }
}
