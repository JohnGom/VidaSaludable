import { INCREMENT_PUNTAJE } from './../../reducer/reducers';
import { Component, OnInit } from '@angular/core';
import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

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
    this.service.getQuestions('sueno').subscribe(
      data => {
      this.questions = data.json();
    });
    this.service.getInfoInterp('sueno').subscribe(
      data => {
      this.infoInter = data.json();
    });
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
    infoFisiologico.push({ question: this.questions[0].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.infosueno })
    this.service.detalleInterven(infoFisiologico).subscribe((result: any) => {
      console.log(result);
    });

    let infoInterp = [];
    infoInterp.push({ intervencion: this.intervencion, participante: this.idPar, nombre: 'Sueño', resultado: this.interSueno, recomendacion: this.recoSueno, dimension: 'Descanso' });
    this.service.insertInterpretacion(infoInterp).subscribe((result: any) => {
      if(result.text() == 'ok') {
        this.router.navigate(['/salud/jorActiva/espiritual']);
      }
    });    
  }
}
