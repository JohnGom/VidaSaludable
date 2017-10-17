import { INFO_INTERPRETATION } from './../../reducer/reducers';
import { ShareDataService } from './../../servicios/sharedata/share-data.service';
import { User } from './../../data/user';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { JornadaService } from '../../servicios/jornadas/jornada.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css']
})
export class JornadaComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('currentUser')) || [];
  dataSource = [];

  constructor(private service: JornadaService,
              private store:Store<any>,
              private shareservice: ShareDataService) {
    
    if(this.user.token !== undefined) {
    this.service.getJornadas(this.user.token).subscribe(
      data => {
      this.dataSource = data.json();
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

  send(id: number) {
    let info: any = new Object;
    info.jornada = id;
    this.store.dispatch({ type: INFO_INTERPRETATION, payload: info});
  }

}
