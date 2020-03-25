import {Component, Input, OnInit} from '@angular/core';
import {IDevice} from '../../../shared/models/interfaces/i-employee';
import {DeviceService} from '../../../shared/http/device.service';

@Component({
  selector: 'app-devices-table',
  templateUrl: './devices-table.component.html',
  styleUrls: ['./devices-table.component.scss']
})
export class DevicesTableComponent implements OnInit {
  columns = ['name', 'invNumber', 'type'];
  @Input() devices: IDevice[] = [];
  @Input() showEmployeeName;

  constructor(public deviceService: DeviceService) {
    deviceService.getAllTypes().subscribe();
  }

  ngOnInit(): void {
    if (this.showEmployeeName) {
      this.columns = ['employeeName', ...this.columns];
    }
  }
}
