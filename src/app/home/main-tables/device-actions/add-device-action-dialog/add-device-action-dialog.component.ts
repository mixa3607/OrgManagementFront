import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AddDeviceComponent} from '../../devices/add-device/add-device.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-device-action-dialog',
  templateUrl: './add-device-action-dialog.component.html',
  styleUrls: ['./add-device-action-dialog.component.scss']
})
export class AddDeviceActionDialogComponent implements OnInit {
  @ViewChild('AddComp') addComp: AddDeviceComponent;

  constructor(private dialogRef: MatDialogRef<AddDeviceActionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public deviceId: number) {
  }

  ngOnInit(): void {
  }

  add(): void {
    this.addComp.add().subscribe(value => this.dialogRef.close());
  }
}
