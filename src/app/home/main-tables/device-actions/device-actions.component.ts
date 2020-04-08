import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SnackbarService} from '../../../shared/services/snackbar.service';
import {DeleteDialogComponent} from '../../../delete-dialog/delete-dialog.component';
import {DeviceActionService} from '../../../shared/http/device-action.service';
import {AddDeviceActionDialogComponent} from './add-device-action-dialog/add-device-action-dialog.component';
import {IDeviceActionL} from '../../../shared/models/list-models/i-device-action-l';

@Component({
  selector: 'app-device-actions',
  templateUrl: './device-actions.component.html',
  styleUrls: ['./device-actions.component.scss']
})
export class DeviceActionsComponent implements OnInit {
  deviceActions: IDeviceActionL[] = [];
  deviceActionsCount = 0;

  constructor(private deviceActionService: DeviceActionService,
              private dialog: MatDialog,
              private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.getActions();
    this.deviceActionService.deviceActionsChangeSubject.subscribe(() => this.getActions());
  }

  getActions(): void {
    this.deviceActionService.getAll().subscribe(value => {
      this.deviceActions = value.values;
      this.deviceActionsCount = value.totalCount;
    });
  }

  openAddActionDialog(): void {
    this.dialog.open(AddDeviceActionDialogComponent, {
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
        this.deviceActionService.del(id).subscribe(() => {
          this.snackbarService.openSnackBar('Сертификат успешно удалён');
        }, error => {
          this.snackbarService.openSnackBar('Ошибка удаления сертификата');
        });
      }
    });
  }
}
