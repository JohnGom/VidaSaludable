import { IntervencionesService } from './../../servicios/offline/intervencion/intervenciones.service';
import { INCREMENT_PUNTAJE } from './../../reducer/reducers';
import { Component, OnInit } from '@angular/core';
import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import _ from 'lodash';

@Component({
  selector: 'app-espiritualidad',
  templateUrl: './espiritualidad.component.html',
  styleUrls: ['./espiritualidad.component.css']
})
export class EspiritualidadComponent implements OnInit {
  public jornada: any;
  public idPar: any;
  public intervencion: any;
  public questions: any = [];
  public infoInter: any = [];
  espiritual: string;
  public interEspiritual: string;
  public recoEspiritual: string;
  public onlineOffline: boolean = navigator.onLine;

  constructor(private service: InterpretationService,
              private store:Store<any>,
              private router: Router,
              private _service: IntervencionesService) {
    this.store.select('people').subscribe((result) => {
      this.jornada = result.jornada;
      this.idPar = result.idpar;
      this.intervencion = result.inter;
    });
  }

  ngOnInit() {
  this.getQuestions();
  }

  getQuestions() {
    if (this.onlineOffline === true) {
      this.service.getQuestions('espiritual').subscribe(
        data => {
        this.questions = data.json();
      });
      this.service.getInfoInterp('espiritual').subscribe(
        data => {
        this.infoInter = data.json();
      });
    } else {
      this._service.getQuestionByDimen().
      then(data => {
        let info: any = data;
        this.questions = _.filter(info, (o) => { return o.dimension === 'espiritual' });
        console.log(this.questions);
      }).catch(error => {
        console.error(error);
      });
      this._service.getInfoInterByDimen().
      then(data => {
        let info: any = data;
        this.infoInter = _.filter(info, (o) => { return o.dimension === 'espiritual' });
      }).catch(error => {
        console.error(error);
      });
    }
  }

  onChangeInfoEspiritual(value){
    this.interEspiritual = value
    if(this.interEspiritual === this.infoInter[0].categoria) {
      this.recoEspiritual = this.infoInter[0].recomendacion;
    } else if (this.interEspiritual === this.infoInter[1].categoria) {
      this.recoEspiritual = this.infoInter[1].recomendacion;
    } else if (this.interEspiritual === this.infoInter[2].categoria) {
      this.recoEspiritual = this.infoInter[2].recomendacion;
    } else if (this.interEspiritual === this.infoInter[3].categoria) {
      this.recoEspiritual = this.infoInter[0].recomendacion;  
    }
  }

  increPuntaje() {
    let puntaje = 0;
    if(this.interEspiritual === this.infoInter[0].categoria) {
      puntaje += 10;
    } else if (this.interEspiritual === this.infoInter[1].categoria) {
      puntaje += 7;
    } else if (this.interEspiritual === this.infoInter[2].categoria) {
      puntaje += 4;
    }
    this.store.dispatch({ type: INCREMENT_PUNTAJE, payload: puntaje});
  }

  saveData(){
    this.increPuntaje();
    let infoFisiologico = [];
    infoFisiologico.push({ question: parseInt(this.questions[0].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.espiritual })
    if (this.onlineOffline === true) {
      this.service.detalleInterven(infoFisiologico).subscribe((result: any) => {
        console.log(result);
      });
    } else {
      for(let i = 0; i<infoFisiologico.length; i++) {
      this._service.addDetalleInter(infoFisiologico[i]).
      then(data => {
        console.log(data);
      }).catch(error => {
        console.error(error);
      });
      }
    }

    let infoInterp = [];
    infoInterp.push({ intervencion: parseInt(this.intervencion), participante: parseInt(this.idPar), nombre: 'Espiritualidad', resultado: this.interEspiritual, recomendacion: this.recoEspiritual, dimension: 'Espiritualidad' });
    if (this.onlineOffline === true) {
      this.service.insertInterpretacion(infoInterp).subscribe((result: any) => {
        if(result.text() == 'ok') {
          this.router.navigate(['/salud/jorActiva/resumen']);
        }
      });
    } else {
      for(let i = 0; i<infoInterp.length; i++) {
      this._service.addInterpretacion(infoInterp[i]).
      then(data => {
        
      }).catch(error => {
        console.error(error);
      });
    }
    this.router.navigate(['/salud/jorActiva/resumen']);
    }
  }

}
