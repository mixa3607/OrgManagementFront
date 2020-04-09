import {Component, Inject, OnInit} from '@angular/core';
import {IEmployeeDt} from '../../../../shared/models/detailed-models/i-employee-dt';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EmployeeService} from '../../../../shared/http/employee.service';

@Component({
  selector: 'app-show-employee-dialog',
  templateUrl: './show-employee-dialog.component.html',
  styleUrls: ['./show-employee-dialog.component.scss']
})
export class ShowEmployeeDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public employeeId: number) {
  }

  ngOnInit(): void {
  }
}
