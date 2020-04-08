import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DeviceService} from '../../../shared/http/device.service';
import {IDeviceL} from '../../../shared/models/list-models/i-device-l';

@Component({
  selector: 'app-devices-table',
  templateUrl: './devices-table.component.html',
  styleUrls: ['./devices-table.component.scss']
})
export class DevicesTableComponent implements OnInit {
  columns = ['name', 'invNumber', 'type', 'actions'];
  @Input() devices: IDeviceL[] = [];
  @Input() showEmployeeName;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onOpen = new EventEmitter<number>();

  constructor(public deviceService: DeviceService) {
    deviceService.getAllTypes().subscribe();
  }

  ngOnInit(): void {
    if (this.showEmployeeName) {
      this.columns = ['employeeName', ...this.columns];
    }
  }
}
