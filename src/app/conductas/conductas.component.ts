import { Component, OnInit } from '@angular/core';
import { InterpretationService } from './../servicios/interpretations/interpretation.service';

@Component({
  selector: 'app-conductas',
  templateUrl: './conductas.component.html',
  styleUrls: ['./conductas.component.css']
})
export class ConductasComponent implements OnInit {
  private questions: object;
  private smoke: string;
  private smoke1: string;
  private smoke2: string;
  private smoke3: string;
  private smoke4: string;
  private drinkBeer: string;
  private drinkBeer1: string;
  private drinkBeer2: string;
  private drinkBeer3: string;
  private drinkBeer4: string;
  private stress: string;
  jornada: number = parseInt(localStorage.getItem('idjornada'));
  idPar: number = parseInt(localStorage.getItem('idparticipante'));

  constructor(private service: InterpretationService) { }

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

  saveData(){
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
  }
}
