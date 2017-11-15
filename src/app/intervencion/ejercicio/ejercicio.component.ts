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
  public jornada: any;
  public idPar: any;
  public intervencion: any;
  public questions: object;
  public infoInter: object;
  public exercise: string;
  public exercise1: string;
  public interExercise: string;
  public recoExercise: string;
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
    });
    this.service.getInfoInterp('ejercicio').subscribe(
      data => {
      this.infoInter = data.json();
    });
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
