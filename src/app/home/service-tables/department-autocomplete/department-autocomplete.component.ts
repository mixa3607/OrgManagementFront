import {Component, OnInit} from '@angular/core';
import {IIdNamePair} from '../../../shared/models/interfaces/i-id-name-pair';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../../../delete-dialog/delete-dialog.component';
import {DepartmentAutocompleteService} from '../../../shared/http/department-autocomplete.service';

@Component({
  selector: 'app-department-autocomplete',
  templateUrl: './department-autocomplete.component.html',
  styleUrls: ['./department-autocomplete.component.scss']
})
export class DepartmentAutocompleteComponent implements OnInit {
  types: IIdNamePair[] = [];
  typesCount = 0;

  constructor(private departmentAutocompleteService: DepartmentAutocompleteService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.updTypes();
    this.departmentAutocompleteService.changeObs.subscribe(() => this.updTypes());
  }

  updTypes(): void {
    this.departmentAutocompleteService.getAll().subscribe(value => {
      this.types = value;
      this.typesCount = value.length;
    });
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
      data: 'Удалить запись?'
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.departmentAutocompleteService.delete(id).subscribe();
      }
    });
  }

  // add(): void {
  //   this.dialog.open(AddTypeDialogComponent, {
  //     disableClose: false,
  //     data: {addFunc: name => this.departmentAutocompleteService.add(name)} as IAddTypeData
  //   });
  // }
}
