import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FileService} from '../../../../shared/http/file.service';
import {FileInput} from 'ngx-material-file-input';
import {forkJoin} from 'rxjs';
import {SnackbarService} from '../../../../shared/services/snackbar.service';
import {EmployeeService} from '../../../../shared/http/employee.service';
import {IEmployeeDt} from '../../../../shared/models/detailed-models/i-employee-dt';
import {ITaxId} from '../../../../shared/models/detailed-models/i-tax-id';
import {IPassport} from '../../../../shared/models/detailed-models/i-passport';
import {DepartmentAutocompleteService} from '../../../../shared/http/department-autocomplete.service';
import {WorkingPositionAutocompleteService} from '../../../../shared/http/working-position-autocomplete.service';
import {map, startWith} from 'rxjs/operators';
import {IIdNamePair} from '../../../../shared/models/interfaces/i-id-name-pair';

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  styleUrls: ['./add-employee-dialog.component.scss']
})
export class AddEmployeeDialogComponent implements OnInit {
  mainForm: FormGroup;
  passportForm: FormGroup;
  taxIdForm: FormGroup;

  passportScanControl: FormControl;
  taxIdScanControl: FormControl;

  inProcess = false;

  departmentOpts: IIdNamePair[];
  workingPositionOpts: IIdNamePair[];

  constructor(public dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
              private departmentAutocompleteService: DepartmentAutocompleteService,
              private workingPositionAutocompleteService: WorkingPositionAutocompleteService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private fileService: FileService,
              private snackbarService: SnackbarService,
              private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.passportScanControl = this.formBuilder.control('', [Validators.required]);
    this.taxIdScanControl = this.formBuilder.control('', [Validators.required]);
    this.mainForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      department: ['', [Validators.required]],
      workingPosition: ['', [Validators.required]],
      ipv4Address: ['', [Validators.required]],
      domainNameEntry: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
    this.passportForm = this.formBuilder.group({
      initials: ['', [Validators.required]],
      batch: ['', [Validators.required]],
      serialNumber: ['', [Validators.required]],
      issuer: ['', [Validators.required]],
      issuerNum: ['', [Validators.required]],
      issuedAt: ['', [Validators.required]],
      regPlace: ['', [Validators.required]],
      birthPlace: ['', [Validators.required]],
      birthDay: ['', [Validators.required]],
      // scanFile: ['', [Validators.required]]
    });
    this.taxIdForm = this.formBuilder.group({
      serialNumber: ['', [Validators.required]],
      // taxIdScan: ['', [Validators.required]]
    });

    this.departmentAutocompleteService.getAll().subscribe(ac => {
      this.mainForm.controls.department.valueChanges.pipe(startWith(''), map(value => {
        const filterValue = value.toLowerCase();
        this.departmentOpts = ac.filter(option => option.name.toLowerCase().includes(filterValue));
      })).subscribe();
    });

    this.workingPositionAutocompleteService.getAll().subscribe(ac => {
      this.mainForm.controls.workingPosition.valueChanges.pipe(startWith(''), map(value => {
        const filterValue = value.toLowerCase();
        this.workingPositionOpts = ac.filter(option => option.name.toLowerCase().includes(filterValue));
      })).subscribe();
    });
  }

  allFormsIsValid(): boolean {
    // return true;
    return this.passportScanControl.valid
      && this.taxIdScanControl.valid
      && this.mainForm.valid
      && this.passportForm.valid
      && this.taxIdForm.valid;
  }

  uploadBin(): void {
    const taxIdFile = (this.taxIdScanControl.value as FileInput).files[0];
    const passportFile = (this.passportScanControl.value as FileInput).files[0];
    forkJoin([this.fileService.uploadImg(taxIdFile), this.fileService.uploadImg(passportFile)])
      .subscribe(([taxIdUpl, passportUpl]) => {
          this.inProcess = true;
          const employee = this.mainForm.value as IEmployeeDt;
          employee.passport = this.passportForm.value as IPassport;
          employee.passport.scanFileId = passportUpl.id;
          employee.taxId = this.taxIdForm.value as ITaxId;
          employee.taxId.scanFileId = taxIdUpl.id;
          this.employeeService.add(employee).subscribe(() => {
            this.snackbarService.openSnackBar('Сотрудник добавлен');
            this.workingPositionAutocompleteService.flush();
            this.departmentAutocompleteService.flush();
            this.dialogRef.close();
          }, error => {
            console.log('Error:', error);
            this.inProcess = false;
          });
        },
        err => {
          console.log('Error:', err);
          this.inProcess = false;
        },
        () => console.log('Completed'));
  }

  close(): void {
    this.dialogRef.close();
  }
}
