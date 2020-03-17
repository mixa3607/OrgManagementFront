import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  public mainSidenavSubject = new Subject();
  constructor() { }
}
