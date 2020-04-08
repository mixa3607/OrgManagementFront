import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IEmployeeL} from '../../../shared/models/list-models/i-employee-l';


import {trigger, sequence, state, animate, transition, style} from '@angular/animations';

export const rowsAnimation =
  trigger('rowsAnimation', [
    transition('void => *', [
      style({height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none'}),
      sequence([
        animate('.35s ease', style({height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'})),
        animate('.35s ease', style({height: '*', opacity: 1, transform: 'translateX(0)'}))
      ])
    ])
  ]);


@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'],
  animations: [rowsAnimation]
})
export class EmployeesTableComponent implements OnInit {
  columns = ['initials', 'department', 'workingPosition', 'phoneNumber', 'isOnline', 'actions'];
  @Input() employees: IEmployeeL[] = [];
  @Output() onDelete = new EventEmitter<number>();
  @Output() onOpen = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

}



