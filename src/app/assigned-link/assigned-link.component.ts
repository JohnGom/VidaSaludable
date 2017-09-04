import { User } from './../data/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assigned-link',
  templateUrl: './assigned-link.component.html',
  styleUrls: ['./assigned-link.component.css']
})
export class AssignedLinkComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('currentUser')) || [];
  tipo: boolean
  constructor() { 
    if(this.user.type === "encuestador"){
      this.tipo = true;
    } else {
      this.tipo = false;
    }
  }

  ngOnInit() {
  }

}
