import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IIdNamePair} from '../models/interfaces/i-id-name-pair';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TypesGetMgr} from './types-get-mgr';

@Injectable({
  providedIn: 'root'
})
export class WorkingPositionAutocompleteService {
  private readonly tMgr: TypesGetMgr;
  public changeObs: Observable<unknown>;

  constructor(private http: HttpClient) {
    this.tMgr = new TypesGetMgr(http, `${environment.managementApiUrl}/workingPositionTip`);
    this.changeObs = this.tMgr.typesChangedObs;
  }

  getAll(): Observable<IIdNamePair[]> {
    return this.tMgr.getAll();
  }

  get(id: number): Observable<IIdNamePair> {
    return this.tMgr.get(id);
  }

  delete(id: number): Observable<any> {
    return this.tMgr.delete(id);
  }

  public flush(): void {
    this.tMgr.flush();
  }
}
