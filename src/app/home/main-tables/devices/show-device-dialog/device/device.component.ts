import {Component, Input, OnInit} from '@angular/core';
import {IDeviceDt} from '../../../../../shared/models/detailed-models/i-device-dt';
import {IDeviceActionL} from '../../../../../shared/models/list-models/i-device-action-l';
import {ISoftwareL} from '../../../../../shared/models/list-models/i-software-l';
import {DeviceService} from '../../../../../shared/http/device.service';
import {DeviceTypeService} from '../../../../../shared/http/device-type.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  @Input() deviceId: number;

  public device: IDeviceDt;
  public deviceActions: IDeviceActionL[] = [];
  public software: ISoftwareL[] = [];
  constructor(private deviceService: DeviceService,
              public deviceTypeService: DeviceTypeService) { }

  ngOnInit(): void {
    this.deviceService.get(this.deviceId).subscribe(value => this.device = value);
    this.deviceService.getSoft(this.deviceId).subscribe(value => this.software = value.values);
    this.deviceService.getActions(this.deviceId).subscribe(value => this.deviceActions = value.values);
  }

}
