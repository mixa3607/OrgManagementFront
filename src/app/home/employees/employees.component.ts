import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {AddEmployeeDialogComponent} from './add-employee-dialog/add-employee-dialog.component';
import {IEmployee} from '../../shared/models/interfaces/i-employee';
import {EmployeeService} from '../../shared/http/employee.service';
import {EChangeActionType} from '../../shared/models/i-act';
import {DeleteDialogComponent} from '../../delete-dialog/delete-dialog.component';
import {ShowEmployeeDialogComponent} from './show-employee-dialog/show-employee-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: IEmployee[] = [];
  employeesMap = new Map<number, IEmployee>(); //

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog,
              public employeeService: EmployeeService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.employeeService.employeesSubject.subscribe(value => {
      switch (value.type) {
        case EChangeActionType.ADD:
          const empl = value.value as IEmployee;
          this.employeesMap.set(empl.id, empl);
          break;
        case EChangeActionType.DEL:
          const id = value.value as number;
          this.employeesMap.delete(id);
          break;
      }
      this.employees = Array.from(this.employeesMap.values());
    });
    this.employeeService.getAll().subscribe();
  }

  openAddEmployeeDialog(): Observable<string> {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      disableClose: false,
      // height : '80rem'
    });
    return dialogRef.afterClosed() as Observable<string>;
  }

  openDelEmployeeDialog(id: number):void {
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

  openShowEmployeeDialog(id:number):void{
    const dialogRef = this.dialog.open(ShowEmployeeDialogComponent, {
      disableClose: false,
      data: id
    });
  }

  delEmployee(id: number): void {
    this.employeeService.delEmployee(id).subscribe();
  }
}


