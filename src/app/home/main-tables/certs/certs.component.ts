import {Component, OnInit} from '@angular/core';
import {ICert} from '../../../shared/models/interfaces/i-employee';
import {CertService} from '../../../shared/http/cert.service';

@Component({
  selector: 'app-certs',
  templateUrl: './certs.component.html',
  styleUrls: ['./certs.component.scss']
})
export class CertsComponent implements OnInit {
  certs: ICert[] = [];
  showEmployeeName = true;

  constructor(private certService: CertService) {
  }

  ngOnInit(): void {
    this.certService.certsSubject.subscribe(value => {
      this.certs = value;
    });
    this.certService.getAll().subscribe();
  }

}
