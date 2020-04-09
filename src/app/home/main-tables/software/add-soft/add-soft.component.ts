import {Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IIdNamePair} from '../../../../shared/models/interfaces/i-id-name-pair';
import {DeviceService} from '../../../../shared/http/device.service';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {debounceTime, filter, switchMap, takeUntil, tap} from 'rxjs/operators';
import {SoftwareService} from '../../../../shared/http/software.service';
import {SoftwareTypeService} from '../../../../shared/http/software-type.service';

@Component({
  selector: 'app-add-soft',
  templateUrl: './add-soft.component.html',
  styleUrls: ['./add-soft.component.scss']
})
export class AddSoftComponent implements OnInit {
  @Output() get isValid(): boolean {
    return this.allFormsIsValid();
  };

  @Input() deviceId: number;

  public softForm: FormGroup;
  public types: IIdNamePair[] = [];

  // public deviceSelectControl = new FormControl('', [Validators.required]);
  public searchCtrl: FormControl = new FormControl();
  public devicesSubject = new ReplaySubject<IIdNamePair[]>(1);
  public searching = false;
  protected _onDestroy = new Subject<void>();

  constructor(private softwareTypeService: SoftwareTypeService,
              private softwareService: SoftwareService,
              private deviceService: DeviceService,
              private formBuilder: FormBuilder) {
    softwareTypeService.getAll().subscribe(value => this.types = value);
    this.softForm = formBuilder.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
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
    return this.softForm.valid;
  }

  add(): Observable<any> {
    const formVal = this.softForm.value as any;
    return this.softwareService.add(formVal);
  }

}
