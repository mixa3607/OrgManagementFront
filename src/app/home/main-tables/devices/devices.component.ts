import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../../../shared/http/device.service';
import {IDeviceL} from '../../../shared/models/list-models/i-device-l';
import {MatDialog} from '@angular/material/dialog';
import {AddDeviceDialogComponent} from './add-device-dialog/add-device-dialog.component';
import {ShowEmployeeDialogComponent} from '../employees/show-employee-dialog/show-employee-dialog.component';
import {ShowDeviceDialogComponent} from './show-device-dialog/show-device-dialog.component';
import {DeleteDialogComponent} from '../../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  devices: IDeviceL[] = [];
  devicesCount = 0;
  showEmployeeName = true;

  constructor(private deviceService: DeviceService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.updDevices();
    this.deviceService.changeObs.subscribe(() => this.updDevices());
  }

  updDevices(): void {
    this.deviceService.getAll().subscribe(value => {
      this.devices = value.values;
      this.devicesCount = value.totalCount;
    });
  }

  openAddDeviceDialog(): void {
    this.dialog.open(AddDeviceDialogComponent, {
      disableClose: false,
      data: null
    });
  }

  openShowDeviceDialog(id: number): void {
    this.dialog.open(ShowDeviceDialogComponent, {
      disableClose: false,
      data: id
    });
  }

  openDelDeviceDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
      data: 'Удалить устройство?'
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.deviceService.delete(id).subscribe();
      }
    });
  }
}
