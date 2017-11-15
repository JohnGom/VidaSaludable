import { AuthserviceService } from './../servicios/authservice.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  @Input() name: string;

  constructor(private service: AuthserviceService,
              public router: Router) { }

  ngOnInit() {
  }

  SignOff() {
    this.service.logout();
  }

}
