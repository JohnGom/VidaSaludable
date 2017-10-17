import { INCREMENT_PUNTAJE } from './../../reducer/reducers';
import { Component, OnInit } from '@angular/core';
import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-espiritualidad',
  templateUrl: './espiritualidad.component.html',
  styleUrls: ['./espiritualidad.component.css']
})
export class EspiritualidadComponent implements OnInit {
  private jornada: any;
  private idPar: any;
  private intervencion: any;
  private questions: object;
  espiritual: string;
  private interEspiritual: string;
  private recoEspiritual: string;

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
    this.service.getQuestions('espiritual').subscribe(
      data => {
      this.questions = data.json();
      console.log(this.questions);
    })
  }

  onChangeInfoEspiritual(value){
    this.interEspiritual = value
    if(this.interEspiritual === 'Espiritual') {
      this.recoEspiritual = 'Continúa fortaleciendo diariamente tu espiritualidad para mejorar tu sistema inmunológico y salud mental'
    } else if (this.interEspiritual === 'Moderadamente espiritual') {
      this.recoEspiritual = 'Busca incorporar en tu vida nuevas prácticas religiosas y/o espirituales individuales, grupales o en contacto con la naturaleza para mejorar tu sistema inmunológico, tu salud mental y control del estrés';
    } else if (this.interEspiritual === 'Poco Espiritual') {
      this.recoEspiritual = 'Incorpora en tu vida prácticas religiosas y/o espirituales individuales, grupales o en contacto con la naturaleza para mejorar tu sistema inmunológico, tu salud mental y control del estrés';
    } else if (this.interEspiritual === 'No Espiritual') {
      this.recoEspiritual = 'Incorpora en tu vida prácticas religiosas y/o espirituales individuales, grupales o en contacto con la naturaleza para mejorar tu sistema inmunológico, tu salud mental y control de estrés';
    }
  }

  increPuntaje() {
    let puntaje = 0;
    if(this.interEspiritual === 'Espiritual') {
      puntaje += 10;
    } else if (this.interEspiritual === 'Moderadamente espiritual') {
      puntaje += 7;
    } else if (this.interEspiritual === 'Poco Espiritual') {
      puntaje += 4;
    }
    this.store.dispatch({ type: INCREMENT_PUNTAJE, payload: puntaje});
  }

  saveData(){
    this.increPuntaje();
    let infoFisiologico = [];
    infoFisiologico.push({ question: this.questions[0].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.espiritual })
    this.service.detalleInterven(infoFisiologico).subscribe((result: any) => {
       console.log(result);
    });

    let infoInterp = [];
    infoInterp.push({ intervencion: this.intervencion, participante: this.idPar, nombre: 'Espiritualidad', resultado: this.interEspiritual, recomendacion: this.recoEspiritual, dimension: 'Espiritualidad' });
    this.service.insertInterpretacion(infoInterp).subscribe((result: any) => {
       if(result.text() == 'ok') {
        this.router.navigate(['/salud/jorActiva/resumen']);
      }
    });
  }

}
