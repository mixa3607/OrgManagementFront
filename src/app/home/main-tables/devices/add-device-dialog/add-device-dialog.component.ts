import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IIdNamePair} from '../../../../shared/models/interfaces/i-id-name-pair';
import {AddDeviceComponent} from '../add-device/add-device.component';

@Component({
  selector: 'app-add-device-dialog',
  templateUrl: './add-device-dialog.component.html',
  styleUrls: ['./add-device-dialog.component.scss']
})
export class AddDeviceDialogComponent implements OnInit {
  @ViewChild('AddDeviceComp') addDeviceComp: AddDeviceComponent;

  constructor(private dialogRef: MatDialogRef<AddDeviceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public employee: IIdNamePair) {
  }

  ngOnInit(): void {
  }

  add(): void {
    this.addDeviceComp.add().subscribe(value => this.dialogRef.close());
  }
}
