import {Component, Input, OnInit, Output} from '@angular/core';
import {IEmployeeDt} from '../../../../shared/models/detailed-models/i-employee-dt';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of, ReplaySubject, Subject} from 'rxjs';
import {IIdNamePair} from '../../../../shared/models/interfaces/i-id-name-pair';
import {debounceTime, filter, switchMap, takeUntil, tap} from 'rxjs/operators';
import {EmployeeService} from '../../../../shared/http/employee.service';
import {DeviceService} from '../../../../shared/http/device.service';
import {IDeviceDt} from '../../../../shared/models/detailed-models/i-device-dt';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  @Output() get isValid(): boolean {
    return this.allFormsIsValid();
  };

  @Input() set employee(employee: IEmployeeDt) {
    if (employee) {
      this.employeesSelectControl.setValue(employee);
    }
  };

  public deviceForm: FormGroup;
  public types: IIdNamePair[] = [];

  public employeesSelectControl = new FormControl('', [Validators.required]);
  public searchCtrl: FormControl = new FormControl();
  public employeesSubject = new ReplaySubject<IIdNamePair[]>(1);
  public searching = false;
  protected _onDestroy = new Subject<void>();

  constructor(private employeeService: EmployeeService,
              private deviceService: DeviceService,
              private formBuilder: FormBuilder) {
    deviceService.getAllTypes().subscribe(value => this.types = value.values);
    this.deviceForm = formBuilder.group({
      name: ['', [Validators.required]],
      invNumber: ['', [Validators.required]],
      typeId: ['', [Validators.required]],
      employeeId: ['',[Validators.required]]
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

  allFormsIsValid(){
    return this.deviceForm.valid;
  }

  add(): Observable<any> {
    const formVal = this.deviceForm.value as any;
    return this.employeeService.addDevice(formVal.employeeId, formVal);
  }
}
