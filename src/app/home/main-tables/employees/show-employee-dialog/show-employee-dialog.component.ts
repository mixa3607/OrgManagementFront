import {Component, Inject, OnInit} from '@angular/core';
import {IEmployee} from '../../../../shared/models/interfaces/i-employee';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EmployeeService} from '../../../../shared/http/employee.service';

@Component({
  selector: 'app-show-employee-dialog',
  templateUrl: './show-employee-dialog.component.html',
  styleUrls: ['./show-employee-dialog.component.scss']
})
export class ShowEmployeeDialogComponent implements OnInit {

  employee: IEmployee;

  constructor(public dialogRef: MatDialogRef<ShowEmployeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public employeeId: number,
              private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.getEmployee(this.employeeId).subscribe(value => {
      this.employee = value;
    });
  }

  close(accept = false): void {
    this.dialogRef.close(accept);
  }
}