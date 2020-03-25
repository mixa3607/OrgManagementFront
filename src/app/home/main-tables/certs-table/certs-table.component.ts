import {Component, Input, OnInit} from '@angular/core';
import {ICert} from '../../../shared/models/interfaces/i-employee';

@Component({
  selector: 'app-certs-table',
  templateUrl: './certs-table.component.html',
  styleUrls: ['./certs-table.component.scss']
})
export class CertsTableComponent implements OnInit {
  columns = ['name', 'notAfter', 'notBefore', 'issuer'];
  @Input() certs: ICert[] = [];
  @Input() showEmployeeName;
  constructor() {

  }

  ngOnInit(): void {
    if (this.showEmployeeName){
      this.columns = ['employeeName', ...this.columns];
    }
  }

}
