import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../../shared/http/device.service';
import {IIdNamePair} from '../../../shared/models/interfaces/i-id-name-pair';
import {DeleteDialogComponent} from '../../../delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AddTypeDialogComponent, IAddTypeData} from '../add-type-dialog/add-type-dialog.component';

@Component({
  selector: 'app-device-types',
  templateUrl: './device-types.component.html',
  styleUrls: ['./device-types.component.scss']
})
export class DeviceTypesComponent implements OnInit {
  deviceTypes: IIdNamePair[] = [];
  deviceTypesCount = 0;
  constructor(private deviceService:DeviceService,
              private dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.updTypes();
    this.deviceService.typesChangeSubject.subscribe(value => this.updTypes());
  }

  updTypes():void{
    this.deviceService.getAllTypes().subscribe(value => {
      this.deviceTypes = value.values;
      this.deviceTypesCount = value.totalCount;
    });
  }

  delete(id:number):void{
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
      data: 'Удалить тип?'
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.deviceService.delType(id).subscribe();
      }
    });
  }

  add():void{
    this.dialog.open(AddTypeDialogComponent, {
      disableClose: false,
      data: {addFunc: name => this.deviceService.addType(name)} as IAddTypeData
    });
  }
}
