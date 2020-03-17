import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {SidenavService} from '../../shared/services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName: string;
  constructor(private userService:UserService,
              public sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.userName = this.userService.userName;
  }

  logout():void{
    this.userService.logout().subscribe(value => console.debug(value));
  }

}
