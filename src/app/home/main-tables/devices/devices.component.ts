import {Component, OnInit} from '@angular/core';
import {DeviceService} from '../../../shared/http/device.service';
import {IDevice} from '../../../shared/models/interfaces/i-employee';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  devices: IDevice[] = [];
  showEmployeeName = true;

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    this.deviceService.devicesSubject.subscribe(value => {
      this.devices = value;
    });
    this.deviceService.getAll().subscribe();
  }
}
