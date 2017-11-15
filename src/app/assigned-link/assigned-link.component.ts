import { User } from './../data/user';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assigned-link',
  templateUrl: './assigned-link.component.html',
  styleUrls: ['./assigned-link.component.css']
})
export class AssignedLinkComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('currentUser')) || [];
  encuestador: string;
  coordinador: string;
  administrador: string;
  name: string;

  constructor(public router: Router) {
    this.name = this.user.name;
    if (this.user.type === "encuestador") {
      this.encuestador = this.user.type;
    } else if (this.user.type === "coordinador") {
      this.coordinador = this.user.type;
    } else if (this.user.type === "administrador") {
      this.administrador = this.user.type;
    }
  }

  ngOnInit() {
  }

}
