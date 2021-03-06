import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISoftwareL} from '../../../shared/models/list-models/i-software-l';
import {SoftwareTypeService} from '../../../shared/http/software-type.service';

@Component({
  selector: 'app-software-table',
  templateUrl: './software-table.component.html',
  styleUrls: ['./software-table.component.scss']
})
export class SoftwareTableComponent implements OnInit {
  columns = ['name', 'code', 'type', 'actions'];
  @Input() software: ISoftwareL[] = [];
  @Input() showDeviceName;
  @Output() onDelete = new EventEmitter<number>();
  constructor(public softwareTypeService: SoftwareTypeService) {
  }

  ngOnInit(): void {
    if (this.showDeviceName){
      this.columns = ['deviceName', ...this.columns];
    }
  }

}
