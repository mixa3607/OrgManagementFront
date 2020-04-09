import {Component, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {forkJoin, Observable, of, ReplaySubject, Subject} from 'rxjs';
import {debounceTime, filter, switchMap, takeUntil, tap} from 'rxjs/operators';
import {EmployeeService} from '../../../../shared/http/employee.service';
import {FileService} from '../../../../shared/http/file.service';
import {FileInput} from 'ngx-material-file-input';
import {SnackbarService} from '../../../../shared/services/snackbar.service';
import {IUploadResult} from '../../../../shared/models/interfaces/i-file';
import {ICertDt} from '../../../../shared/models/detailed-models/i-cert-dt';
import {IIdNamePair} from '../../../../shared/models/interfaces/i-id-name-pair';
import {IEmployeeDt} from '../../../../shared/models/detailed-models/i-employee-dt';
import {CertService} from '../../../../shared/http/cert.service';

@Component({
  selector: 'app-add-cert',
  templateUrl: './add-cert.component.html',
  styleUrls: ['./add-cert.component.scss']
})
export class AddCertComponent implements OnInit, OnDestroy {
  @Output() get isValid(): boolean {
    return this.allFormsIsValid();
  };

  @Input() set employee(employee: IIdNamePair) {
    if (employee) {
      this.employeesSelectControl.setValue(employee);
    }
  };

  public employeesSelectControl = new FormControl('', [Validators.required]);
  public certForm: FormGroup;

  public certFileControl = new FormControl('', [Validators.required]);
  public certFileId: number;
  public certContainerFileControl = new FormControl('');

  public searchCtrl: FormControl = new FormControl();
  public employeesSubject = new ReplaySubject<IIdNamePair[]>(1);
  public searching = false;
  protected _onDestroy = new Subject<void>();

  constructor(private certService: CertService,
              private formBuilder: FormBuilder,
              private fileService: FileService,
              private employeeService: EmployeeService,
              private snackbarService: SnackbarService) {
    this.certForm = formBuilder.group({
      name: ['', [Validators.required]],
      issuer: ['', [Validators.required]],
      notBefore: ['', [Validators.required]],
      notAfter: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.searchCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        takeUntil(this._onDestroy),
        debounceTime(200),
        switchMap(search => {
          return this.employeeService.search(search);
        })
      )
      .subscribe(filtered => {
          this.searching = false;
          this.employeesSubject.next(filtered);
        },
        error => {
          this.searching = false;
        });
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private allFormsIsValid(): boolean {
    return this.employeesSelectControl.valid && this.certFileControl.valid && this.certContainerFileControl.valid && this.certForm.valid;
  }

  add(): Observable<any> {
    const formValue = this.certForm.value as ICertDt;
    const uplF: Observable<IUploadResult>[] = [];

    if (this.certFileId) {
      uplF.push(of<IUploadResult>({id: this.certFileId, hash: null}));
    } else {
      uplF.push(this.fileService.uploadBin((this.certFileControl.value as FileInput).files[0]));
    }

    if (this.certContainerFileControl.value instanceof FileInput) {
      uplF.push(this.fileService.uploadBin(this.certContainerFileControl.value.files[0]));
    } else {
      uplF.push(of<IUploadResult>({id: null, hash: null}));
    }
    return forkJoin(uplF).pipe(
      switchMap(([certUpl, contUpl]) => {
        formValue.certFileId = certUpl.id;
        formValue.containerFileId = contUpl.id;
        return this.certService.add(formValue);
      }));
  }

  public uploadCert(): void {
    const file = (this.certFileControl.value as FileInput).files[0];

    this.fileService.uploadCert(file).subscribe(value => {
      this.certForm.controls.issuer.setValue(value.issuer);
      this.certForm.controls.notAfter.setValue(value.notAfter);
      this.certForm.controls.notBefore.setValue(value.notBefore);
      this.certFileId = value.id;
    }, error => {
      this.snackbarService.openSnackBar('Файл не является валидным сертификатом. Введите данные вручную.');
    });
  }
}
