import { Component, OnInit } from '@angular/core';
import { InterpretationService } from './../servicios/interpretations/interpretation.service';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.css']
})
export class EjercicioComponent implements OnInit {
  jornada: number = parseInt(localStorage.getItem('idjornada'));
  idPar: number = parseInt(localStorage.getItem('idparticipante'));
  private questions: object;
  private exercise: string;
  private exercise1: string;

  constructor(private service: InterpretationService) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    this.service.getQuestions('ejercicio').subscribe(
      data => {
      this.questions = data.json();
      console.log(this.questions);
    })
  }
  
  saveData(){
    let infoFisiologico = [];
    infoFisiologico.push({ question: this.questions[0].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.exercise });
    infoFisiologico.push({ question: this.questions[1].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.exercise1 });
    this.service.detalleInterven(infoFisiologico).subscribe((result: any) => {
       console.log(result);
    });
  }
}
