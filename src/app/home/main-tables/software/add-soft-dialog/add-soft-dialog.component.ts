import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AddDeviceComponent} from '../../devices/add-device/add-device.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-soft-dialog',
  templateUrl: './add-soft-dialog.component.html',
  styleUrls: ['./add-soft-dialog.component.scss']
})
export class AddSoftDialogComponent implements OnInit {
  @ViewChild('AddComp') addComp: AddDeviceComponent;

  constructor(private dialogRef: MatDialogRef<AddSoftDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public deviceId: number) {
  }

  ngOnInit(): void {
  }

  add(): void {
    this.addComp.add().subscribe(value => this.dialogRef.close());
  }
}
