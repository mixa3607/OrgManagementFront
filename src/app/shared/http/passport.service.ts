import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {IPassportUpdate} from '../models/update/i-passport-update';
import {IPassport} from '../models/detailed-models/i-passport';

@Injectable({
  providedIn: 'root'
})
export class PassportService {
  managementApiUrl: string;

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }

  update(id: number, upd: IPassportUpdate): Observable<IPassport> {
    return this.http.post<IPassport>(this.managementApiUrl + '/passport/' + id, upd);
  }
}
