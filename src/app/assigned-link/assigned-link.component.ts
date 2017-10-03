import { User } from './../data/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assigned-link',
  templateUrl: './assigned-link.component.html',
  styleUrls: ['./assigned-link.component.css']
})
export class AssignedLinkComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('currentUser')) || [];
  encuestador: string;
  coordinador: string;
  administrador: string;
  constructor() { 
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
