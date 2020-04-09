import {Component, OnInit} from '@angular/core';
import {CertService} from '../../../shared/http/cert.service';
import {AddCertDialogComponent} from './add-cert-dialog/add-cert-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SnackbarService} from '../../../shared/services/snackbar.service';
import {DeleteDialogComponent} from '../../../delete-dialog/delete-dialog.component';
import {ICertL} from '../../../shared/models/list-models/i-cert-l';

@Component({
  selector: 'app-certs',
  templateUrl: './certs.component.html',
  styleUrls: ['./certs.component.scss']
})
export class CertsComponent implements OnInit {
  certs: ICertL[] = [];
  certsTotal = 0;
  showEmployeeName = true;

  constructor(private certService: CertService,
              private dialog: MatDialog,
              private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.getCerts();
    this.certService.changeObs.subscribe(() => this.getCerts());
  }

  getCerts(): void {
    this.certService.getAll().subscribe(value => {
      this.certs = value.values;
      this.certsTotal = value.totalCount;
    });
  }

  openAddCertDialog(): void {
    this.dialog.open(AddCertDialogComponent, {
      disableClose: false,
      data: null
    });
  }

  del(id: number): void {
    this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
      data: 'Удалить сертификат?'
    }).afterClosed().subscribe(value => {
      if (value) {
        this.certService.delete(id).subscribe(() => {
          this.snackbarService.openSnackBar('Сертификат успешно удалён');
        }, error => {
          this.snackbarService.openSnackBar('Ошибка удаления сертификата');
        });
      }
    });
  }
}
