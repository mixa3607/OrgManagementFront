import { Component, OnInit } from '@angular/core';
import {DeviceService} from '../../../shared/http/device.service';
import {IType} from '../../../shared/models/interfaces/i-type';
import {DeleteDialogComponent} from '../../../delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AddTypeDialogComponent, IAddTypeData} from '../add-type-dialog/add-type-dialog.component';

@Component({
  selector: 'app-device-types',
  templateUrl: './device-types.component.html',
  styleUrls: ['./device-types.component.scss']
})
export class DeviceTypesComponent implements OnInit {
  deviceTypes: IType[] = [];
  constructor(private deviceService:DeviceService,
              private dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.deviceService.typesSubject.subscribe(value => this.deviceTypes = value);
    this.deviceService.getAllTypes().subscribe();
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
