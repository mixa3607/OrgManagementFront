import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ITaxIdUpdate} from '../models/update/i-tax-id-update';
import {ITaxId} from '../models/detailed-models/i-tax-id';
import {IPassport} from '../models/detailed-models/i-passport';

@Injectable({
  providedIn: 'root'
})
export class TaxIdService {
  managementApiUrl: string;

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  update(id: number, upd: ITaxIdUpdate): Observable<ITaxId> {
    return this.http.post<IPassport>(this.managementApiUrl + '/taxId/' + id, upd);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.managementApiUrl + '/taxId/' + id);
  }
}
