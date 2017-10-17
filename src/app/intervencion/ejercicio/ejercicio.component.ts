import { INCREMENT_PUNTAJE } from './../../reducer/reducers';
import { Component, OnInit } from '@angular/core';
import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.css']
})
export class EjercicioComponent implements OnInit {
  private jornada: any;
  private idPar: any;
  private intervencion: any;
  private questions: object;
  private exercise: string;
  private exercise1: string;
  private interExercise: string;
  private recoExercise: string;
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
    this.service.getQuestions('ejercicio').subscribe(
      data => {
      this.questions = data.json();
      console.log(this.questions);
    })
  }

  onChangeInfo(value) {
    if(this.exercise === 'Si' && value === 'Si') {
      this.interExercise = 'Físicamente activo';
      this.recoExercise = 'Mantén tu nivel de actividad física. Realizar Actividad Física contribuye a tu salud mental y física y aumenta el número de años de vida saludable';
    } else if(this.exercise === 'Si' && value === 'No') {
      this.interExercise = 'Recientemente activo físicamente';
      this.recoExercise = 'Mantén tu nivel de actividad física. Realizar Actividad Física contribuye a tu salud mental y física y aumenta el número de años de vida saludable';
    } else if(this.exercise === 'No' && value === 'No') {
      this.interExercise = 'Físicamente inactivo';
      this.recoExercise = 'Debes Realizar actividad física mínimo 30 minutos por día por 5 días a la semana para mejorar tu salud mental y física y aumentar el número de años de vida saludable';
    } else {
      alert("Esta posibilidad de respuesta no es coherente. Revise las respuestas");
    }
  }

  increPuntaje() {
    let puntaje = 0;
    if(this.interExercise === 'Físicamente activo') {
      puntaje += 25;
    } else if (this.interExercise === 'Recientemente activo físicamente') {
      puntaje += 12.5;
    }

    this.store.dispatch({ type: INCREMENT_PUNTAJE, payload: puntaje});
  }
  
  saveData(){
    this.increPuntaje();

    let infoFisiologico = [];
    infoFisiologico.push({ question: this.questions[0].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.exercise });
    infoFisiologico.push({ question: this.questions[1].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.exercise1 });
    this.service.detalleInterven(infoFisiologico).subscribe((result: any) => {
       console.log(result);
    });

    let infoInterp = [];
    infoInterp.push({ intervencion: this.intervencion, participante: this.idPar, nombre: 'Ejercicio Fisico', resultado: this.interExercise, recomendacion: this.recoExercise, dimension: 'Ejercicio' });
    this.service.insertInterpretacion(infoInterp).subscribe((result: any) => {
       if(result.text() == 'ok') {
        this.router.navigate(['/salud/jorActiva/nutricion']);
      }
    });
  }
}
