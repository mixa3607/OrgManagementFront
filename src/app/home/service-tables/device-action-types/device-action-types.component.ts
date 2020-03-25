import { Component, OnInit } from '@angular/core';
import {DeviceActionService} from '../../../shared/http/device-action.service';
import {IType} from '../../../shared/models/interfaces/i-type';
import {DeleteDialogComponent} from '../../../delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-device-action-types',
  templateUrl: './device-action-types.component.html',
  styleUrls: ['./device-action-types.component.scss']
})
export class DeviceActionTypesComponent implements OnInit {
  deviceActionTypes: IType[] = [];
  constructor(private deviceActionService:DeviceActionService,
              private dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.deviceActionService.typesSubject.subscribe(value => this.deviceActionTypes = value);
    this.deviceActionService.getAllTypes().subscribe();
  }


  delete(id:number):void{
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
      data: 'Удалить тип?'
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.deviceActionService.delType(id).subscribe();
      }
    });
  }
}
