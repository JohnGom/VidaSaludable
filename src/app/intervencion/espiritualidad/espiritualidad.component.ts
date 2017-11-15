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
  public jornada: any;
  public idPar: any;
  public intervencion: any;
  public questions: any = [];
  public infoInter: any = [];
  espiritual: string;
  public interEspiritual: string;
  public recoEspiritual: string;

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
    });
    this.service.getInfoInterp('espiritual').subscribe(
      data => {
      this.infoInter = data.json();
    });
  }

  onChangeInfoEspiritual(value){
    this.interEspiritual = value
    if(this.interEspiritual === this.infoInter[0].categoria) {
      this.recoEspiritual = this.infoInter[0].recomendacion;
    } else if (this.interEspiritual === this.infoInter[1].categoria) {
      this.recoEspiritual = this.infoInter[1].recomendacion;
    } else if (this.interEspiritual === this.infoInter[2].categoria) {
      this.recoEspiritual = this.infoInter[2].recomendacion;
    } else if (this.interEspiritual === this.infoInter[3].categoria) {
      this.recoEspiritual = this.infoInter[0].recomendacion;  
    }
  }

  increPuntaje() {
    let puntaje = 0;
    if(this.interEspiritual === this.infoInter[0].categoria) {
      puntaje += 10;
    } else if (this.interEspiritual === this.infoInter[1].categoria) {
      puntaje += 7;
    } else if (this.interEspiritual === this.infoInter[2].categoria) {
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
