import {Component, OnInit} from '@angular/core';
import {IIdNamePair} from '../../../shared/models/interfaces/i-id-name-pair';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../../../delete-dialog/delete-dialog.component';
import {AddTypeDialogComponent, IAddTypeData} from '../add-type-dialog/add-type-dialog.component';
import {SoftwareTypeService} from '../../../shared/http/software-type.service';

@Component({
  selector: 'app-software-types',
  templateUrl: './software-types.component.html',
  styleUrls: ['./software-types.component.scss']
})
export class SoftwareTypesComponent implements OnInit {
  softwareTypes: IIdNamePair[] = [];
  softwareTypesCount = 0;

  constructor(private softwareTypeService: SoftwareTypeService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.updTypes();
    this.softwareTypeService.changeObs.subscribe(() => this.updTypes());
  }

  updTypes(): void {
    this.softwareTypeService.getAll().subscribe(value => {
      this.softwareTypes = value;
      this.softwareTypesCount = value.length;
    });
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
      data: 'Удалить тип?'
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.softwareTypeService.delete(id).subscribe();
      }
    });
  }

  add(): void {
    this.dialog.open(AddTypeDialogComponent, {
      disableClose: false,
      data: {addFunc: name => this.softwareTypeService.add(name)} as IAddTypeData
    });
  }
}
