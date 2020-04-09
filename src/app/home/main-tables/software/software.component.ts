import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SnackbarService} from '../../../shared/services/snackbar.service';
import {DeleteDialogComponent} from '../../../delete-dialog/delete-dialog.component';
import {SoftwareService} from '../../../shared/http/software.service';
import {AddSoftDialogComponent} from './add-soft-dialog/add-soft-dialog.component';
import {ISoftwareL} from '../../../shared/models/list-models/i-software-l';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.scss']
})
export class SoftwareComponent implements OnInit {
  software: ISoftwareL[] = [];
  softwareCount = 0;

  constructor(private softwareService: SoftwareService,
              private dialog: MatDialog,
              private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.getSoft();
    this.softwareService.changeObs.subscribe(() => this.getSoft());
  }

  getSoft(): void {
    this.softwareService.getAll().subscribe(value => {
      this.software = value.values;
      this.softwareCount = value.totalCount;
    });
  }

  openAddSoftDialog(): void {
    this.dialog.open(AddSoftDialogComponent, {
      disableClose: false,
      data: null
    });
  }

  del(id: number): void {
    this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
      data: 'Удалить ПО?'
    }).afterClosed().subscribe(value => {
      if (value) {
        this.softwareService.delete(id).subscribe(() => {
          this.snackbarService.openSnackBar('ПО успешно удалено');
        }, error => {
          this.snackbarService.openSnackBar('Ошибка удаления ПО');
        });
      }
    });
  }
}
