import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IType} from '../../../shared/models/interfaces/i-type';

@Component({
  selector: 'app-types-table',
  templateUrl: './types-table.component.html',
  styleUrls: ['./types-table.component.scss']
})
export class TypesTableComponent implements OnInit {
  @Input() types: IType[] = [];
  @Output() onDelete = new EventEmitter<number>();
  columns = ['id', 'name', 'actions'];

  constructor() {
  }

  ngOnInit(): void {
  }
}
