import {Component, OnInit} from '@angular/core';
import {DeviceActionService} from '../../../shared/http/device-action.service';
import {IIdNamePair} from '../../../shared/models/interfaces/i-id-name-pair';
import {DeleteDialogComponent} from '../../../delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AddTypeDialogComponent, IAddTypeData} from '../add-type-dialog/add-type-dialog.component';
import {DeviceActionTypeService} from '../../../shared/http/device-action-type.service';

@Component({
  selector: 'app-device-action-types',
  templateUrl: './device-action-types.component.html',
  styleUrls: ['./device-action-types.component.scss']
})
export class DeviceActionTypesComponent implements OnInit {
  deviceActionTypes: IIdNamePair[] = [];
  deviceActionTypesCount = 0;

  constructor(private deviceActionTypeService: DeviceActionTypeService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.updTypes();
    this.deviceActionTypeService.changeObs.subscribe(value => this.updTypes());
  }

  updTypes(): void {
    this.deviceActionTypeService.getAll().subscribe(value => {
      this.deviceActionTypes = value;
      this.deviceActionTypesCount = value.length;
    });
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
      data: 'Удалить тип?'
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.deviceActionTypeService.delete(id).subscribe();
      }
    });
  }

  add(): void {
    this.dialog.open(AddTypeDialogComponent, {
      disableClose: false,
      data: {addFunc: name => this.deviceActionTypeService.add(name)} as IAddTypeData
    });
  }
}
