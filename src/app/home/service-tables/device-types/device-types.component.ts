import {Component, OnInit} from '@angular/core';
import {IIdNamePair} from '../../../shared/models/interfaces/i-id-name-pair';
import {DeleteDialogComponent} from '../../../delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AddTypeDialogComponent, IAddTypeData} from '../add-type-dialog/add-type-dialog.component';
import {DeviceTypeService} from '../../../shared/http/device-type.service';

@Component({
  selector: 'app-device-types',
  templateUrl: './device-types.component.html',
  styleUrls: ['./device-types.component.scss']
})
export class DeviceTypesComponent implements OnInit {
  deviceTypes: IIdNamePair[] = [];
  deviceTypesCount = 0;

  constructor(private deviceTypeService: DeviceTypeService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.updTypes();
    this.deviceTypeService.changeObs.subscribe(value => this.updTypes());
  }

  updTypes(): void {
    this.deviceTypeService.getAll().subscribe(value => {
      this.deviceTypes = value;
      this.deviceTypesCount = value.length;
    });
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
      data: 'Удалить тип?'
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.deviceTypeService.delete(id).subscribe();
      }
    });
  }

  add(): void {
    this.dialog.open(AddTypeDialogComponent, {
      disableClose: false,
      data: {addFunc: name => this.deviceTypeService.add(name)} as IAddTypeData
    });
  }
}
