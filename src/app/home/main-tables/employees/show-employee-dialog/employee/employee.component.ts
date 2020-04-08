import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IEmployeeDt} from '../../../../../shared/models/detailed-models/i-employee-dt';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileService} from '../../../../../shared/http/file.service';
import {SnackbarService} from '../../../../../shared/services/snackbar.service';
import {EmployeeService} from '../../../../../shared/http/employee.service';
import {IEmployeeUpdate} from '../../../../../shared/models/update/i-employee-update';
import {FileInput} from 'ngx-material-file-input';
import {PassportService} from '../../../../../shared/http/passport.service';
import {Observable, of} from 'rxjs';
import {IUploadResult} from '../../../../../shared/models/interfaces/i-file';
import {TaxIdService} from '../../../../../shared/http/tax-id.service';
import {environment} from '../../../../../../environments/environment';
import {IPassportUpdate} from '../../../../../shared/models/update/i-passport-update';
import {ITaxIdUpdate} from '../../../../../shared/models/update/i-tax-id-update';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  @Input() employee: IEmployeeDt;
  inEditMain = false;
  inEditPassport = false;
  inEditTaxId = false;

  mainForm: FormGroup;
  passportForm: FormGroup;
  taxIdForm: FormGroup;

  passportScanControl: FormControl;
  taxIdScanControl: FormControl;

  inProcess = false;

  constructor(private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private fileService: FileService,
              private snackbarService: SnackbarService,
              private employeeService: EmployeeService,
              private passportService: PassportService,
              private taxIdService: TaxIdService) {
  }

  ngOnInit(): void {
    this.passportScanControl = this.formBuilder.control('none', [Validators.required]);
    this.taxIdScanControl = this.formBuilder.control('none', [Validators.required]);
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

    this.setMainFormValues(this.employee);
    this.setPassportFormValues(this.employee);
    this.setTaxIdFormValues(this.employee);
  }


  allFormsIsValid(): boolean {
    // return true;
    return this.passportScanControl.valid
      && this.taxIdScanControl.valid
      && this.mainForm.valid
      && this.passportForm.valid
      && this.taxIdForm.valid;
  }

  setPassportFormValues(employee: IEmployeeDt): void {
    this.passportForm.setValue({
      initials: employee.passport.initials,
      batch: employee.passport.batch,
      serialNumber: employee.passport.serialNumber,
      issuer: employee.passport.issuer,
      issuerNum: employee.passport.issuerNum,
      issuedAt: employee.passport.issuedAt,
      regPlace: employee.passport.regPlace,
      birthPlace: employee.passport.birthPlace,
      birthDay: employee.passport.birthDay,
    });
  }

  setMainFormValues(employee: IEmployeeDt): void {
    this.mainForm.setValue({
      name: employee.name,
      department: employee.department,
      workingPosition: employee.workingPosition,
      ipv4Address: employee.ipv4Address,
      domainNameEntry: employee.domainNameEntry,
      phoneNumber: employee.phoneNumber,
      email: employee.email,
    });
  }

  setTaxIdFormValues(employee: IEmployeeDt): void {
    this.taxIdForm.setValue({
      serialNumber: employee.taxId.serialNumber,
    });
  }

  openTaxIdScan():void{
    this.openImage(this.employee.taxId.scanFileId);
  }
  openPassportScan():void{
    this.openImage(this.employee.passport.scanFileId);
  }
  openImage(id: number): void {
    this.fileService.get(id).subscribe(value => {
      window.open(environment.managementApiUrl + '/file/' + value.md5Hash, 'Image','width=largeImage.stylewidth,height=largeImage.style.height,resizable=1');
    })
  }

  saveMainInfo(): void {
    const formValues = this.mainForm.value as IEmployeeUpdate;
    this.employeeService.updateEmployee(this.employee.id, formValues).subscribe(value => {
      this.snackbarService.openSnackBar('Данные обновлены');
      this.inEditMain = false;
      this.employee = value;
    });
  }

  savePassport(): void {
    const formValues = this.passportForm.value as IPassportUpdate;
    let fileUpdate: Observable<IUploadResult>;
    if (this.passportScanControl.value === 'none') {
      fileUpdate = of<any>({id: 0});
    } else {
      const passportFile = (this.passportScanControl.value as FileInput).files[0];
      fileUpdate = this.fileService.uploadImg(passportFile);
    }
    fileUpdate.subscribe(value => {
      formValues.scanFileId = value.id;
      this.passportService.update(this.employee.passport.id, formValues).subscribe(value1 => {
        this.snackbarService.openSnackBar('Данные обновлены');
        this.inEditPassport = false;
        this.employee.passport = value1;
      });
    });
  }

  saveTaxId(): void {
    const formValues = this.taxIdForm.value as ITaxIdUpdate;
    let fileUpdate: Observable<IUploadResult>;
    if (this.taxIdScanControl.value === 'none') {
      fileUpdate = of<any>({id: 0});
    } else {
      const taxIdFile = (this.taxIdScanControl.value as FileInput).files[0];
      fileUpdate = this.fileService.uploadImg(taxIdFile);
    }
    fileUpdate.subscribe(value => {
      formValues.scanFileId = value.id;
      this.taxIdService.update(this.employee.taxId.id, formValues).subscribe(value1 => {
        this.snackbarService.openSnackBar('Данные обновлены');
        this.inEditTaxId = false;
        this.employee.taxId = value1;
      });
    });
  }
}

@Component(
  {
    selector: 'value-with-header',
    template: '<div style="height: 66px" fxLayout="column" fxLayoutAlign="center left">\n' +
      '        <span style="color: #8c8991;">{{header}}: </span>\n' +
      '        <a style="margin-left: 1rem; height: 1rem;">{{value}}</a>\n' +
      '      </div>'
  }
)
export class ValueWithHeaderComponent {
  @Input() value: any;
  @Input() header: string;
}


@Component(
  {
    selector: 'button-with-header',
    template: '<div style="height: 66px" fxLayout="row" fxLayoutAlign="start center">\n' +
      '        <span style="color: #8c8991;">{{header}}: </span>\n' +
      '        <button (click)="click($event)" mat-icon-button>\n' +
      '            <mat-icon>{{matIconName}}</mat-icon>\n' +
      '          </button>\n' +
      '      </div>'
  }
)
export class ButtonWithHeaderComponent {
  @Input() matIconName: string;
  @Input() header: string;
  @Output() buttonClick = new EventEmitter<any>();
  click(event: any){
    this.buttonClick.emit(event);
  }
}
