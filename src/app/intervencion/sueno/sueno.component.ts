import { IntervencionesService } from './../../servicios/offline/intervencion/intervenciones.service';
import { INCREMENT_PUNTAJE } from './../../reducer/reducers';
import { Component, OnInit } from '@angular/core';
import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import _ from 'lodash';

@Component({
  selector: 'app-sueno',
  templateUrl: './sueno.component.html',
  styleUrls: ['./sueno.component.css']
})
export class SuenoComponent implements OnInit {

  public questions: object;
  public infoInter: object;
  infosueno: number;
  public interSueno: string;
  public recoSueno: string;
  public jornada: any;
  public idPar: any;
  public intervencion: any;
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
      this.service.getQuestions('sueno').subscribe(
        data => {
        this.questions = data.json();
      });
      this.service.getInfoInterp('sueno').subscribe(
        data => {
        this.infoInter = data.json();
      });
    } else {
      this._service.getQuestionByDimen().
      then(data => {
        let info: any = data;
        this.questions = _.filter(info, (o) => { return o.dimension === 'sueno' });
        console.log(this.questions);
      }).catch(error => {
        console.error(error);
      });
      this._service.getInfoInterByDimen().
      then(data => {
        let info: any = data;
        this.infoInter = _.filter(info, (o) => { return o.dimension === 'sueno' });
      }).catch(error => {
        console.error(error);
      });
    }
  }
  onChangeInfoSueno(value) {
    if (value < 6){
      this.interSueno = this.infoInter[0].categoria;
      this.recoSueno = this.infoInter[0].recomendacion;
    } else if (value>=6 && value<=8){
      this.interSueno = this.infoInter[1].categoria;
      this.recoSueno = this.infoInter[1].recomendacion;
    } else if (value>8){
      this.interSueno = this.infoInter[2].categoria;
      this.recoSueno = this.infoInter[2].recomendacion;
    }
  }

  increPuntaje() {
    let puntaje = 0;
    if(this.interSueno === this.infoInter[1].categoria) {
      puntaje += 10;
    } else if (this.interSueno === this.infoInter[2].categoria) {
      puntaje += 5;
    }

    this.store.dispatch({ type: INCREMENT_PUNTAJE, payload: puntaje});
  }

  saveData(){
    this.increPuntaje();

    let infoFisiologico = [];
    infoFisiologico.push({ question: parseInt(this.questions[0].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.infosueno })
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
    infoInterp.push({ intervencion: parseInt(this.intervencion), participante: parseInt(this.idPar), nombre: 'Sueño', resultado: this.interSueno, recomendacion: this.recoSueno, dimension: 'Descanso' });
    if (this.onlineOffline === true) {
      this.service.insertInterpretacion(infoInterp).subscribe((result: any) => {
        if(result.text() == 'ok') {
          this.router.navigate(['/salud/jorActiva/espiritual']);
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
    this.router.navigate(['/salud/jorActiva/espiritual']);
    }
  }
}
