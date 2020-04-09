import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-show-device-dialog',
  templateUrl: './show-device-dialog.component.html',
  styleUrls: ['./show-device-dialog.component.scss']
})
export class ShowDeviceDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public deviceId: number) {
  }

  ngOnInit(): void {
  }
}
