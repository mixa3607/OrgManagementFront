import {Component, OnInit} from '@angular/core';
import {IIdNamePair} from '../../../shared/models/interfaces/i-id-name-pair';
import {DeviceService} from '../../../shared/http/device.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../../../delete-dialog/delete-dialog.component';
import {AddTypeDialogComponent, IAddTypeData} from '../add-type-dialog/add-type-dialog.component';
import {SoftwareService} from '../../../shared/http/software.service';

@Component({
  selector: 'app-software-types',
  templateUrl: './software-types.component.html',
  styleUrls: ['./software-types.component.scss']
})
export class SoftwareTypesComponent implements OnInit {
  softwareTypes: IIdNamePair[] = [];
  softwareTypesCount = 0;

  constructor(private deviceService: DeviceService,
              private softwareService: SoftwareService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.updTypes();
    this.softwareService.typesChangeSubject.subscribe(value => this.updTypes());
  }

  updTypes(): void {
    this.softwareService.getAllTypes().subscribe(value => {
      this.softwareTypes = value.values;
      this.softwareTypesCount = value.totalCount;
    });
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
      data: 'Удалить тип?'
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.softwareService.delType(id).subscribe();
      }
    });
  }

  add(): void {
    this.dialog.open(AddTypeDialogComponent, {
      disableClose: false,
      data: {addFunc: name => this.softwareService.addType(name)} as IAddTypeData
    });
  }
}
