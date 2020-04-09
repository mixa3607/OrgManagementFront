import {Component, OnInit} from '@angular/core';
import {IIdNamePair} from '../../../shared/models/interfaces/i-id-name-pair';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../../../delete-dialog/delete-dialog.component';
import {WorkingPositionAutocompleteService} from '../../../shared/http/working-position-autocomplete.service';

@Component({
  selector: 'app-working-position-autocomplete',
  templateUrl: './working-position-autocomplete.component.html',
  styleUrls: ['./working-position-autocomplete.component.scss']
})
export class WorkingPositionAutocompleteComponent implements OnInit {
  types: IIdNamePair[] = [];
  typesCount = 0;

  constructor(private workingPositionAutocompleteService: WorkingPositionAutocompleteService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.updTypes();
    this.workingPositionAutocompleteService.changeObs.subscribe(() => this.updTypes());
  }

  updTypes(): void {
    this.workingPositionAutocompleteService.getAll().subscribe(value => {
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
        this.workingPositionAutocompleteService.delete(id).subscribe();
      }
    });
  }

  // add(): void {
  //   this.dialog.open(AddTypeDialogComponent, {
  //     disableClose: false,
  //     data: {addFunc: name => this.workingPositionAutocompleteService.add(name)} as IAddTypeData
  //   });
  // }
}
