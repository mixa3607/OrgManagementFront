import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IIdNamePair} from '../../../shared/models/interfaces/i-id-name-pair';

@Component({
  selector: 'app-types-table',
  templateUrl: './types-table.component.html',
  styleUrls: ['./types-table.component.scss']
})
export class TypesTableComponent implements OnInit {
  @Input() types: IIdNamePair[] = [];
  @Output() onDelete = new EventEmitter<number>();
  columns = ['id', 'name', 'actions'];

  constructor() {
  }

  ngOnInit(): void {
  }
}
