import { AuthserviceService } from './../servicios/authservice.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  constructor(private service: AuthserviceService,
              private router: Router) { }

  ngOnInit() {
  }

  SignOff() {
    this.service.logout();
  }

}
