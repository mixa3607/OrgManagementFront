import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {AddEmployeeDialogComponent} from './add-employee-dialog/add-employee-dialog.component';
import {EmployeeService} from '../../../shared/http/employee.service';
import {DeleteDialogComponent} from '../../../delete-dialog/delete-dialog.component';
import {ShowEmployeeDialogComponent} from './show-employee-dialog/show-employee-dialog.component';
import {IEmployeeL} from '../../../shared/models/list-models/i-employee-l';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: IEmployeeL[] = [];
  employeesCount = 0;

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog,
              public employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.updEmployees();
    this.employeeService.employeesChangedSubject.subscribe(() => this.updEmployees());
  }

  updEmployees() {
    this.employeeService.getAll().subscribe(value => {
      this.employees = value.values;
      this.employeesCount = value.totalCount;
    });
  }

  openAddEmployeeDialog(): Observable<string> {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      disableClose: false,
      // height : '80rem'
    });
    return dialogRef.afterClosed() as Observable<string>;
  }

  openDelEmployeeDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
      data: 'Удалить сотрудника?'
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.delEmployee(id);
      }
    });
  }

  openShowEmployeeDialog(id: number): void {
    this.dialog.open(ShowEmployeeDialogComponent, {
      disableClose: false,
      data: id
    });
  }

  delEmployee(id: number): void {
    this.employeeService.delEmployee(id).subscribe();
  }
}


