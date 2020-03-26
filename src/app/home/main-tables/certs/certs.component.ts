import {Component, OnInit} from '@angular/core';
import {ICert, IEmployee} from '../../../shared/models/interfaces/i-employee';
import {CertService} from '../../../shared/http/cert.service';
import {ShowEmployeeDialogComponent} from '../employees/show-employee-dialog/show-employee-dialog.component';
import {AddCertDialogComponent} from '../add-cert-dialog/add-cert-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SnackbarService} from '../../../shared/services/snackbar.service';
import {DeleteDialogComponent} from '../../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-certs',
  templateUrl: './certs.component.html',
  styleUrls: ['./certs.component.scss']
})
export class CertsComponent implements OnInit {
  certs: ICert[] = [];
  showEmployeeName = true;

  constructor(private certService: CertService,
              private dialog: MatDialog,
              private snackbarService:SnackbarService) {
  }

  ngOnInit(): void {
    this.certService.certsSubject.subscribe(value => {
      this.certs = value;
    });
    this.certService.getAll().subscribe();
  }

  openAddCertDialog():void{
    this.dialog.open(AddCertDialogComponent, {
      disableClose: false,
      data: null
    });
  }

  del(id:number):void{
    this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
      data: 'Удалить сертификат?'
    }).afterClosed().subscribe(value => {
      if (value) this.certService.del(id).subscribe(() => {
        this.snackbarService.openSnackBar('Сертификат успешно удалён');
      },error => {
        this.snackbarService.openSnackBar('Ошибка удаления сертификата');
      })
    })
  }
}
