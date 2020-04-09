import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../shared/http/user.service';
import {SidenavService} from '../shared/services/sidenav.service';
import {MatSidenav} from '@angular/material/sidenav';
import {Router} from '@angular/router';

interface ActButton {
  route: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  opened = false;
  mainButtons: ActButton[] = [
    {route: '/home/employee', name: 'Сотрудники'},
    {route: '/home/device', name: 'Устройства'},
    {route: '/home/cert', name: 'Сертификаты'},
    {route: '/home/software', name: 'Софт'},
    {route: '/home/deviceAction', name: 'Действия с устройствами'},
  ];
  serviceButtons: ActButton[] = [
    {route: '/home/deviceType', name: 'Типы устройств'},
    {route: '/home/deviceActionType', name: 'Типы действий'},
    {route: '/home/softwareType', name: 'Типы ПО'},
    {route: '/home/workingPositionAc', name: 'Автодополнение должности'},
    {route: '/home/departmentAc', name: 'Автодополнение отдела'}
  ];

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(public userService: UserService,
              private sidenavService: SidenavService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.userService.checkAdminAuth().subscribe(value => {
      console.log(value);
    }, error => console.log(error));
    this.sidenavService.mainSidenavSubject.subscribe(value => this.sidenav.toggle());
  }

  navigateTo(link: string): void {
    this.router.navigateByUrl(link).then(() => this.opened = false);
  }

}
