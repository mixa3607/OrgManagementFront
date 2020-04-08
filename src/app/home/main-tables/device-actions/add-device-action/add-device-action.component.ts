import {Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IIdNamePair} from '../../../../shared/models/interfaces/i-id-name-pair';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {EmployeeService} from '../../../../shared/http/employee.service';
import {DeviceService} from '../../../../shared/http/device.service';
import {debounceTime, filter, switchMap, takeUntil, tap} from 'rxjs/operators';
import {DeviceActionService} from '../../../../shared/http/device-action.service';

@Component({
  selector: 'app-add-device-action',
  templateUrl: './add-device-action.component.html',
  styleUrls: ['./add-device-action.component.scss']
})
export class AddDeviceActionComponent implements OnInit {
  @Output() get isValid(): boolean {
    return this.allFormsIsValid();
  };

  @Input() deviceId: number;

  public actionForm: FormGroup;
  public types: IIdNamePair[] = [];

  // public deviceSelectControl = new FormControl('', [Validators.required]);
  public searchCtrl: FormControl = new FormControl();
  public devicesSubject = new ReplaySubject<IIdNamePair[]>(1);
  public searching = false;
  protected _onDestroy = new Subject<void>();

  constructor(private deviceActionService: DeviceActionService,
              private deviceService: DeviceService,
              private formBuilder: FormBuilder) {
    deviceActionService.getAllTypes().subscribe(value => this.types = value.values);
    this.actionForm = formBuilder.group({
      note: ['', [Validators.required]],
      receiptDate: ['', [Validators.required]],
      returnDate: ['', [Validators.required]],
      typeId: ['', [Validators.required]],
      deviceId: ['',[Validators.required]]
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
          return this.deviceService.search(search);
        })
      )
      .subscribe(filtered => {
          this.searching = false;
          this.devicesSubject.next(filtered);
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
    return this.actionForm.valid;
  }

  add(): Observable<any> {
    const formVal = this.actionForm.value as any;
    return this.deviceService.addAction(formVal.deviceId, formVal);
  }
}
