import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface IAddTypeData {
  addFunc(name: string): Observable<any>;
}

@Component({
  selector: 'app-add-type-dialog',
  templateUrl: './add-type-dialog.component.html',
  styleUrls: ['./add-type-dialog.component.scss']
})
export class AddTypeDialogComponent implements OnInit {
  nameInputControl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<AddTypeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IAddTypeData) {
  }

  ngOnInit(): void {
  }

  add(name: string): void {
    this.data.addFunc(name).subscribe(value => {
      this.close();
    });
  }

  close(accept = false): void {
    this.dialogRef.close(accept);
  }
}
