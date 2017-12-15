import { IntervencionesService } from './../../servicios/offline/intervencion/intervenciones.service';
import { INCREMENT_PUNTAJE } from './../../reducer/reducers';
import { Component, OnInit } from '@angular/core';
import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import _ from 'lodash';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.css']
})
export class EjercicioComponent implements OnInit {
  public jornada: any;
  public idPar: any;
  public intervencion: any;
  public questions: object;
  public infoInter: object;
  public exercise: string;
  public exercise1: string;
  public interExercise: string;
  public recoExercise: string;
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
      this.service.getQuestions('ejercicio').subscribe(
        data => {
        this.questions = data.json();
      });
      this.service.getInfoInterp('ejercicio').subscribe(
        data => {
        this.infoInter = data.json();
      });
    } else {
      this._service.getQuestionByDimen().
      then(data => {
        let info: any = data;
        this.questions = _.filter(info, (o) => { return o.dimension === 'ejercicio' });
        console.log(this.questions);
      }).catch(error => {
        console.error(error);
      });
      this._service.getInfoInterByDimen().
      then(data => {
        let info: any = data;
        this.infoInter = _.filter(info, (o) => { return o.dimension === 'ejercicio' });
        console.log(this.infoInter);
      }).catch(error => {
        console.error(error);
      });
    }
  }

  onChangeInfo(value) {
    if(this.exercise === 'Si' && value === 'Si') {
      this.interExercise = this.infoInter[0].categoria;
      this.recoExercise = this.infoInter[0].recomendacion;
    } else if(this.exercise === 'Si' && value === 'No') {
      this.interExercise = this.infoInter[1].categoria;
      this.recoExercise = this.infoInter[1].recomendacion;
    } else if(this.exercise === 'No' && value === 'No') {
      this.interExercise = this.infoInter[2].categoria;
      this.recoExercise = this.infoInter[2].recomendacion;
    } else {
      alert("Esta posibilidad de respuesta no es coherente. Revise las respuestas");
    }
  }

  increPuntaje() {
    let puntaje = 0;
    if(this.interExercise === this.infoInter[0].categoria) {
      puntaje += 25;
    } else if (this.interExercise === this.infoInter[1].categoria) {
      puntaje += 12.5;
    }

    this.store.dispatch({ type: INCREMENT_PUNTAJE, payload: puntaje});
  }
  
  saveData(){
    this.increPuntaje();

    let infoFisiologico = [];
    infoFisiologico.push({ question: parseInt(this.questions[0].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.exercise });
    infoFisiologico.push({ question: parseInt(this.questions[1].id), intervened: this.idPar, jornada: this.jornada, respuesta: this.exercise1 });
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
    infoInterp.push({ intervencion: parseInt(this.intervencion), participante: parseInt(this.idPar), nombre: 'Ejercicio Fisico', resultado: this.interExercise, recomendacion: this.recoExercise, dimension: 'Ejercicio' });
    if (this.onlineOffline === true) {
      this.service.insertInterpretacion(infoInterp).subscribe((result: any) => {
        if(result.text() == 'ok') {
          this.router.navigate(['/salud/jorActiva/nutricion']);
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
    this.router.navigate(['/salud/jorActiva/nutricion']);
    }
  }
}
