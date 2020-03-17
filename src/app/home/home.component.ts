import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import validate = WebAssembly.validate;
import {SidenavService} from '../shared/services/sidenav.service';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  opened = false;
  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor(public userService: UserService,
              private sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.userService.checkAdminAuth().subscribe(value => {console.log(value)}, error => console.log(error));
    this.sidenavService.mainSidenavSubject.subscribe(value => this.sidenav.toggle());
  }

  logout():void{
    this.userService.logout().subscribe(value => console.debug(value));
  }





}
