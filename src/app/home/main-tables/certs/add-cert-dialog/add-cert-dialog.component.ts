import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AddCertComponent} from '../add-cert/add-cert.component';
import {IIdNamePair} from '../../../../shared/models/interfaces/i-id-name-pair';

@Component({
  selector: 'app-add-cert-dialog',
  templateUrl: './add-cert-dialog.component.html',
  styleUrls: ['./add-cert-dialog.component.scss']
})
export class AddCertDialogComponent implements OnInit {
  @ViewChild('AddCertComp') addCertComp: AddCertComponent;

  constructor(private dialogRef: MatDialogRef<AddCertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public employee: IIdNamePair) {
  }

  ngOnInit(): void {
  }

  add(): void {
    this.addCertComp.add().subscribe(value => this.dialogRef.close());
  }
}
