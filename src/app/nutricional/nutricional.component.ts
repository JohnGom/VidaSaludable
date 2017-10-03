import { Component, OnInit } from '@angular/core';
import { InterpretationService } from './../servicios/interpretations/interpretation.service';

@Component({
  selector: 'app-nutricional',
  templateUrl: './nutricional.component.html',
  styleUrls: ['./nutricional.component.css']
})
export class NutricionalComponent implements OnInit {
  jornada: number = parseInt(localStorage.getItem('idjornada'));
  idPar: number = parseInt(localStorage.getItem('idparticipante'));
  private questions: object;
  fruits: string;
  vegetables: string;
  grease: string;
  sal: string;
  sugar: string;
  foods: string;
  water: string
  
  constructor(private service: InterpretationService) { }

  ngOnInit() {
  this.getQuestions();
  }

  getQuestions() {
    this.service.getQuestions('nutricional').subscribe(
      data => {
      this.questions = data.json();
      console.log(this.questions);
    })
  }

   saveData(){
    let infoFisiologico = [];
    infoFisiologico.push({ question: this.questions[0].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.fruits })
    infoFisiologico.push({ question: this.questions[1].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.vegetables })
    infoFisiologico.push({ question: this.questions[2].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.grease })
    infoFisiologico.push({ question: this.questions[3].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.sal })
    infoFisiologico.push({ question: this.questions[4].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.sugar })
    infoFisiologico.push({ question: this.questions[5].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.foods })
    infoFisiologico.push({ question: this.questions[6].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.water })
    this.service.detalleInterven(infoFisiologico).subscribe((result: any) => {
       console.log(result);
    });
  }


}
