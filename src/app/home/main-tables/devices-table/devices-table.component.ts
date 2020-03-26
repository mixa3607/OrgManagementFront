import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDevice} from '../../../shared/models/interfaces/i-employee';
import {DeviceService} from '../../../shared/http/device.service';

@Component({
  selector: 'app-devices-table',
  templateUrl: './devices-table.component.html',
  styleUrls: ['./devices-table.component.scss']
})
export class DevicesTableComponent implements OnInit {
  columns = ['name', 'invNumber', 'type', 'actions'];
  @Input() devices: IDevice[] = [];
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
