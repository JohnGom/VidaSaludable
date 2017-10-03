import { ShareDataService } from './../../servicios/sharedata/share-data.service';
import { User } from './../../data/user';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { JornadaService } from '../../servicios/jornadas/jornada.service';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css']
})
export class JornadaComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('currentUser')) || [];
  dataSource = [];

  constructor(private service: JornadaService,
              private shareservice: ShareDataService) {
    
    if(this.user.token !== undefined) {
    this.service.getJornadas(this.user.token).subscribe(
      data => {
      this.dataSource = data.json();
      console.log(this.dataSource);
    })
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.id.currentValue !== undefined) {
    this.service.getJornadas(changes.id.currentValue).subscribe(
      data => {
      this.dataSource = data.json();
    })
    }
  }

  ngOnInit() {
    
  }

  send(id: string) {
    localStorage.setItem('idjornada', id);
  }

}
