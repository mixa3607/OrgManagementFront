import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IEmployee} from '../../../shared/models/interfaces/i-employee';
import {AddCertComponent} from '../add-cert/add-cert.component';

@Component({
  selector: 'app-add-cert-dialog',
  templateUrl: './add-cert-dialog.component.html',
  styleUrls: ['./add-cert-dialog.component.scss']
})
export class AddCertDialogComponent implements OnInit {
  @ViewChild('AddCertComp') addCertComp: AddCertComponent;

  constructor(private dialogRef: MatDialogRef<AddCertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public employee: IEmployee) {
  }

  ngOnInit(): void {
  }

  add(): void {
    this.addCertComp.add().subscribe(value => this.dialogRef.close());
  }
}
