import { JornadasService } from './../../servicios/offline/jornadas/jornada.service';
import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { INFO_INTERPRETATION, ESTADO_BIOQUIMICA } from './../../reducer/reducers';
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
              private service2: InterpretationService,
              private shareservice: ShareDataService,
              private _service: JornadasService) {
    
    if(this.user.token !== undefined) {
    this.service.getJornadas(this.user.token).subscribe(
      data => {
      this.dataSource = data.json();
      console.log(data.json());
      
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
    this.service2.getInfoInterp('espiritual').subscribe(
      data => {
      console.log(data.json());
    })
  }

  send(infojor: any) {
    let info: any = new Object;
    info.jornada = infojor.id;
    let bio = infojor.bioquimica;
    this.store.dispatch({ type: INFO_INTERPRETATION, payload: info});
    this.store.dispatch({ type: ESTADO_BIOQUIMICA, payload: bio});
  }

}
