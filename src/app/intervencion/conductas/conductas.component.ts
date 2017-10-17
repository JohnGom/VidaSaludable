import { INCREMENT_PUNTAJE } from './../../reducer/reducers';
import { Component, OnInit } from '@angular/core';
import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-conductas',
  templateUrl: './conductas.component.html',
  styleUrls: ['./conductas.component.css']
})
export class ConductasComponent implements OnInit {
  private questions: object;
  private smoke: string = '';
  private smoke1: string = '';
  private smoke2: string = '';
  private smoke3: string = '';
  private smoke4: string = '';
  private drinkBeer: string;
  private drinkBeer1: string = '';
  private drinkBeer2: string = '';
  private drinkBeer3: string = '';
  private drinkBeer4: string = '';
  private stress: string = '';
  private interSmoke: string;
  private interDrinkBeer: string;
  private interStress: string;
  private recoSmoke: string;
  private recoDrinkBeer: string;
  private recoStress: string;
  private jornada: any;
  private idPar: any;
  private intervencion: any;

  constructor(private service: InterpretationService,
              private store:Store<any>,
              private router: Router) { 
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
    this.service.getQuestions('riesgo').subscribe(
      data => {
      this.questions = data.json();
      console.log(this.questions);
    })
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
      this.interSmoke = 'Dependencia leve';
      this.recoSmoke = '';
    } else if (cont>=6 && cont<=10){
      this.interSmoke = 'Dependencia moderada';
      this.recoSmoke = '';
    } else if (cont>=11){
      this.interSmoke = 'Dependencia alta';
      this.recoSmoke = '';
    }

  }

  onChangeSmoke(value) {
    if(value === 'No') {
      this.interSmoke = 'No fuma';
      this.recoSmoke = '';
    }
  }
  onChangeDrinkBeer(value) {
    if(value === 'No') {
      this.interDrinkBeer = 'Abstemio';
      this.recoDrinkBeer = '';
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
      this.interDrinkBeer = 'Bebedor social';
      this.recoDrinkBeer = '';
    } else if (cont===2){
      this.interDrinkBeer = 'Consumo de riesgo';
      this.recoDrinkBeer = '';
    } else if (cont===3){
      this.interDrinkBeer = 'Consumo perjudicial';
      this.recoDrinkBeer = '';
    } else if (cont===4){
      this.interDrinkBeer = 'Dependencia alcohólica';
      this.recoDrinkBeer = '';
    }
  }
  onChangeInfoStress(value) {
    if (value === 'Siempre'){
      this.interStress = 'Control adecuado';
      this.recoStress = '';
    } else if (value === 'Con alguna frecuencia'){
      this.interStress = 'Control  regular';
      this.recoStress = '';
    } else {
      this.interStress = 'Control Inadecuado';
      this.recoStress = '';
    }
  }

  increPuntaje() {
    let puntaje = 0;
    if(this.interSmoke === 'No fuma') {
      puntaje += 15;
    } else if (this.interSmoke === 'Dependencia leve') {
      puntaje += 10;
    } else if (this.interSmoke === 'Dependencia moderada') {
      puntaje += 5;
    }
    
    if (this.interDrinkBeer === 'Abstemio') {
      puntaje += 10;
    } else if (this.interDrinkBeer === 'Bebedor social') {
      puntaje += 7.5;
    } else if (this.interDrinkBeer === 'Consumo de riesgo') {
      puntaje += 5;
    } else if (this.interDrinkBeer === 'Consumo perjudicial') {
      puntaje += 2.5;
    }

    if (this.interStress === 'Control adecuado') {
      puntaje += 10;
    } else if (this.interStress === 'Control  regular') {
      puntaje += 5;
    }

    this.store.dispatch({ type: INCREMENT_PUNTAJE, payload: puntaje});
  }

  saveData(){
    console.log(this.smoke1);
    
    this.increPuntaje();

    let infoRiesgo = [];
    infoRiesgo.push({ question: this.questions[0].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.smoke });
    infoRiesgo.push({ question: this.questions[1].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.smoke1 });
    infoRiesgo.push({ question: this.questions[2].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.smoke2 });
    infoRiesgo.push({ question: this.questions[3].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.smoke3 });
    infoRiesgo.push({ question: this.questions[4].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.smoke4 });
    infoRiesgo.push({ question: this.questions[5].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.drinkBeer });
    infoRiesgo.push({ question: this.questions[6].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.drinkBeer1 });
    infoRiesgo.push({ question: this.questions[7].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.drinkBeer2 });
    infoRiesgo.push({ question: this.questions[8].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.drinkBeer3 });
    infoRiesgo.push({ question: this.questions[8].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.drinkBeer4 })
    infoRiesgo.push({ question: this.questions[8].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.stress })
    this.service.detalleInterven(infoRiesgo).subscribe((result: any) => {
       console.log(result);
    });

    let infoInterp = [];
    infoInterp.push({ intervencion: this.intervencion, participante: this.idPar, nombre: 'Fumar', resultado: this.interSmoke, recomendacion: this.recoSmoke, dimension: 'Conductas de Riesgo' });
    infoInterp.push({ intervencion: this.intervencion, participante: this.idPar, nombre: 'Alcohol', resultado: this.interDrinkBeer, recomendacion: this.recoDrinkBeer, dimension: 'Conductas de Riesgo' });
    infoInterp.push({ intervencion: this.intervencion, participante: this.idPar, nombre: 'Estrés', resultado: this.interStress, recomendacion: this.recoStress, dimension: 'Conductas de Riesgo' });
    this.service.insertInterpretacion(infoInterp).subscribe((result: any) => {
       if(result.text() == 'ok') {
        this.router.navigate(['/salud/jorActiva/ejercicio']);
      }
    });    
  }
}
