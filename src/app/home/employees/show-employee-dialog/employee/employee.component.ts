import {Component, Input, OnInit} from '@angular/core';
import {IEmployee} from '../../../../shared/models/interfaces/i-employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  @Input() employee: IEmployee;
  inEdit = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
