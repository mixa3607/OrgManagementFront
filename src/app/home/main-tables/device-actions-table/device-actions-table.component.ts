import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDeviceActionL} from '../../../shared/models/list-models/i-device-action-l';
import {DeviceActionTypeService} from '../../../shared/http/device-action-type.service';

@Component({
  selector: 'app-device-actions-table',
  templateUrl: './device-actions-table.component.html',
  styleUrls: ['./device-actions-table.component.scss']
})
export class DeviceActionsTableComponent implements OnInit {
  columns = ['receiptDate', 'returnDate', 'type', 'actions'];
  @Input() deviceActions: IDeviceActionL[] = [];
  @Input() showDeviceName;
  @Output() onDelete = new EventEmitter<number>();
  constructor(public deviceActionTypeService: DeviceActionTypeService) {
  }

  ngOnInit(): void {
    if (this.showDeviceName){
      this.columns = ['deviceName', ...this.columns];
    }
  }
}
