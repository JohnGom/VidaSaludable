import { IntervencionesService } from './../../servicios/offline/intervencion/intervenciones.service';
import { INCREMENT_PUNTAJE } from './../../reducer/reducers';
import { Component, OnInit } from '@angular/core';
import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import _ from 'lodash';

@Component({
  selector: 'app-conductas',
  templateUrl: './conductas.component.html',
  styleUrls: ['./conductas.component.css']
})
export class ConductasComponent implements OnInit {
  public questions: object;
  public infoInter: object;
  public smoke: string = '';
  public smoke1: string = '';
  public smoke2: string = '';
  public smoke3: string = '';
  public smoke4: string = '';
  public drinkBeer: string;
  public drinkBeer1: string = '';
  public drinkBeer2: string = '';
  public drinkBeer3: string = '';
  public drinkBeer4: string = '';
  public stress: string = '';
  public interSmoke: string;
  public interDrinkBeer: string;
  public interStress: string;
  public recoSmoke: string;
  public recoDrinkBeer: string;
  public recoStress: string;
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
      this.service.getQuestions('riesgo').subscribe(
        data => {
        this.questions = data.json();
      });

      this.service.getInfoInterp('riesgo').subscribe(
        data => {
        this.infoInter = data.json();
      });
    } else {
      this._service.getQuestionByDimen().
      then(data => {
        let info: any = data;
        this.questions = _.filter(info, (o) => { return o.dimension === 'riesgo' });
        console.log(this.questions);
      }).catch(error => {
        console.error(error);
      });
      this._service.getInfoInterByDimen().
      then(data => {
        let info: any = data;
        this.infoInter = _.filter(info, (o) => { return o.dimension === 'riesgo' });
        console.log(this.infoInter);
      }).catch(error => {
        console.error(error);
      });
    }
  }

  onChangeInfoSmoke(deviceValue) {
    let infoRiesgo = [];
    infoRiesgo.push(this.smoke1);
    infoRiesgo.push(this.smoke2);
    infoRiesgo.push(this.smoke3);
    infoRiesgo.push(this.smoke4);
    let cont = 0;
    for(let i=0; i<infoRiesgo.length; i++) {
      if(infoRiesgo[i] === 'Siempre'){
        cont = cont + 4;
      } else if(infoRiesgo[i] === 'A menudo') {
        cont = cont + 3;
      } else if(infoRiesgo[i] === 'A veces') {
        cont = cont + 2;
      } else if(infoRiesgo[i] === 'Raramente') {
        cont = cont + 1;
      }
    }
    if (cont>=1 && cont<=5){
      this.interSmoke = this.infoInter[1].categoria;
      this.recoSmoke = this.infoInter[1].recomendacion;
    } else if (cont>=6 && cont<=10){
      this.interSmoke = this.infoInter[2].categoria;
      this.recoSmoke = this.infoInter[2].recomendacion;
    } else if (cont>=11){
      this.interSmoke = this.infoInter[3].categoria;
      this.recoSmoke = this.infoInter[3].recomendacion;
    }

  }

  onChangeSmoke(value) {
    if(value === 'No') {
      this.interSmoke = this.infoInter[0].categoria;
      this.recoSmoke = this.infoInter[0].recomendacion;
    }
  }
  onChangeDrinkBeer(value) {
    if(value === 'No') {
      this.interDrinkBeer = this.infoInter[4].categoria;
      this.recoDrinkBeer = this.infoInter[4].recomendacion;
    }
  }

  onChangeInfoDrinkBeer(value) {
    let infoRiesgo = [];
    infoRiesgo.push(this.drinkBeer1);
    infoRiesgo.push(this.drinkBeer2);
    infoRiesgo.push(this.drinkBeer3);
    infoRiesgo.push(this.drinkBeer4);
    let cont = 0;
    for(let i=0; i<infoRiesgo.length; i++) {
      if(infoRiesgo[i] === 'Si'){
        cont = cont + 1;
      }
    }
    if (cont>=0 && cont<=1){
      this.interDrinkBeer = this.infoInter[5].categoria;
      this.recoDrinkBeer = this.infoInter[5].recomendacion;
    } else if (cont===2){
      this.interDrinkBeer = this.infoInter[6].categoria;
      this.recoDrinkBeer = this.infoInter[6].recomendacion;
    } else if (cont===3){
      this.interDrinkBeer = this.infoInter[7].categoria;
      this.recoDrinkBeer = this.infoInter[7].recomendacion;
    } else if (cont===4){
      this.interDrinkBeer = this.infoInter[8].categoria;
      this.recoDrinkBeer = this.infoInter[8].recomendacion;
    }
  }
  onChangeInfoStress(value) {
    if (value === 'Siempre'){
      this.interStress = this.infoInter[9].categoria;
      this.recoStress = this.infoInter[9].recomendacion;
    } else if (value === 'Con alguna frecuencia'){
      this.interStress = this.infoInter[10].categoria;
      this.recoStress = this.infoInter[10].recomendacion;
    } else {
      this.interStress = this.infoInter[11].categoria;
      this.recoStress = this.infoInter[11].recomendacion;
    }
  }

  increPuntaje() {
    let puntaje = 0;
    if(this.interSmoke === this.infoInter[0].categoria) {
      puntaje += 15;
    } else if (this.interSmoke === this.infoInter[1].categoria) {
      puntaje += 10;
    } else if (this.interSmoke === this.infoInter[2].categoria) {
      puntaje += 5;
    }
    
    if (this.interDrinkBeer === this.infoInter[4].categoria) {
      puntaje += 10;
    } else if (this.interDrinkBeer === this.infoInter[5].categoria) {
      puntaje += 7.5;
    } else if (this.interDrinkBeer === this.infoInter[6].categoria) {
      puntaje += 5;
    } else if (this.interDrinkBeer === this.infoInter[7].categoria) {
      puntaje += 2.5;
    }

    if (this.interStress === this.infoInter[9].categoria) {
      puntaje += 10;
    } else if (this.interStress === this.infoInter[10].categoria) {
      puntaje += 5;
    }

    this.store.dispatch({ type: INCREMENT_PUNTAJE, payload: puntaje});
  }

  saveData(){
    console.log(this.smoke1);
    
    this.increPuntaje();

    let infoRiesgo = [];
    infoRiesgo.push({ question: parseInt(this.questions[0].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.smoke });
    infoRiesgo.push({ question: parseInt(this.questions[1].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.smoke1 });
    infoRiesgo.push({ question: parseInt(this.questions[2].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.smoke2 });
    infoRiesgo.push({ question: parseInt(this.questions[3].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.smoke3 });
    infoRiesgo.push({ question: parseInt(this.questions[4].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.smoke4 });
    infoRiesgo.push({ question: parseInt(this.questions[5].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.drinkBeer });
    infoRiesgo.push({ question: parseInt(this.questions[6].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.drinkBeer1 });
    infoRiesgo.push({ question: parseInt(this.questions[7].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.drinkBeer2 });
    infoRiesgo.push({ question: parseInt(this.questions[8].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.drinkBeer3 });
    infoRiesgo.push({ question: parseInt(this.questions[8].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.drinkBeer4 })
    infoRiesgo.push({ question: parseInt(this.questions[8].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.stress })
    if (this.onlineOffline === true) {
      this.service.detalleInterven(infoRiesgo).subscribe((result: any) => {
        console.log(result);
      });
    } else {
      for(let i = 0; i<infoRiesgo.length; i++) {
      this._service.addDetalleInter(infoRiesgo[i]).
      then(data => {
        console.log(data);
      }).catch(error => {
        console.error(error);
      });
      }
    }

    let infoInterp = [];
    infoInterp.push({ intervencion: parseInt(this.intervencion), participante: parseInt(this.idPar), nombre: 'Fumar', resultado: this.interSmoke, recomendacion: this.recoSmoke, dimension: 'Conductas de Riesgo' });
    infoInterp.push({ intervencion: parseInt(this.intervencion), participante: parseInt(this.idPar), nombre: 'Alcohol', resultado: this.interDrinkBeer, recomendacion: this.recoDrinkBeer, dimension: 'Conductas de Riesgo' });
    infoInterp.push({ intervencion: parseInt(this.intervencion), participante: parseInt(this.idPar), nombre: 'Estrés', resultado: this.interStress, recomendacion: this.recoStress, dimension: 'Conductas de Riesgo' });
    if (this.onlineOffline === true) {
      this.service.insertInterpretacion(infoInterp).subscribe((result: any) => {
        if(result.text() == 'ok') {
          this.router.navigate(['/salud/jorActiva/ejercicio']);
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
    this.router.navigate(['/salud/jorActiva/ejercicio']);
    }   
  }
}
