import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  managementApiUrl: string;

  constructor(private http: HttpClient) {
    this.managementApiUrl = environment.managementApiUrl;
  }


}
