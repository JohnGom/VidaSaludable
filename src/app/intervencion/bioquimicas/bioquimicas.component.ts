import { IntervencionesService } from './../../servicios/offline/intervencion/intervenciones.service';
import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'app-bioquimicas',
  templateUrl: './bioquimicas.component.html',
  styleUrls: ['./bioquimicas.component.css']
})
export class BioquimicasComponent implements OnInit {

  public dextrom: number;
  public colesterol: number;
  public trigliceridos: number;
  public hdl: number;
  public ldl: number;
  public questions: object;
  public interDextrom;
  public interColest;
  public interTriglic;
  public interHdl;
  public interLdl;
  public comorbilidad;
  public comorbilidadCon;

  public icm;
  public abdomen;
  public tencion;
  public sick;
  public medicamentos;
  public jornada;
  public idPar;
  public intervencion;

  public onlineOffline: boolean = navigator.onLine;

  constructor(private store:Store<any>, 
  private service: InterpretationService, 
  private router: Router,
  private _service: IntervencionesService) {
    this.store.select('people').subscribe((result) => {
      this.jornada = result.jornada;
      this.idPar = result.idpar;
      this.intervencion = result.inter;
    });
     this.store.select('fisio').subscribe((result) => {
      this.icm = result.icm;
      this.abdomen = result.abdomen;
      this.tencion = result.tencion;
      this.sick = result.sick;
      this.medicamentos = result.medicamentos;
    });
   }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    if (this.onlineOffline === true) {
      this.service.getQuestions('bioquimica').subscribe(
        data => {
        this.questions = data.json();
      });
    } else {
      this._service.getQuestionByDimen().
      then(data => {
        let info: any = data;
        this.questions = _.filter(info, (o) => { return o.dimension === 'bioquimica' });
        console.log(this.questions);
      }).catch(error => {
        console.error(error);
      });
    }
  }

  infoDextrometria(value) {
    if (value < 70) {
      this.interDextrom = 'Hipoglicemia';
    } else if (value >= 70 && value<200) {
      this.interDextrom = 'Normal';
    } else if (value >= 200) {
      this.interDextrom = 'Hiperglicemia';
    }
  }

  infoColesterol(value) {
    if (value < 200) {
      this.interColest = 'Normal deseable';
    } else if (value >= 200) {
      this.interColest = 'Anormal';
    } 
  }

  infoTrigliceridos(value) {
    if (value < 150) {
      this.interTriglic = 'Normal deseable';
    } else if (value >= 150) {
      this.interTriglic = 'Anormal';
    } 
  }

  infoHdl(value) {
    if (value < 55) {
      this.interHdl = 'Normal deseable';
    } else if (value >= 55) {
      this.interHdl = 'Anormal';
    } 
  }

  infoLdl(value) {
    this.ldl = this.colesterol-(this.hdl*(this.trigliceridos/5));
    if (this.ldl < 100) {
      this.interLdl = 'Normal deseable';
    } else if (this.ldl >= 100) {
      this.interLdl = 'Anormal';
    }

    if(this.tencion > 140 && this.sick !== 'Ninguna' && this.medicamentos === 'Si' && this.icm >= 30) {
      this.comorbilidad = 'Si';
    } else if (this.dextrom > 200 && this.abdomen > 90 && this.trigliceridos >= 150 && this.hdl >= 55 && this.ldl >= 100) {
      this.comorbilidad = 'En riesgo';
    } else {
      this.comorbilidad = 'No';
    }

    if(this.sick === 'Ninguna') {
      this.comorbilidadCon = 'NA (no aplica)';
    } else if (this.sick !== 'Ninguna' && this.interDextrom === 'Normal' && this.interColest === 'Normal deseable' && this.medicamentos === 'Si' 
    && this.interTriglic === 'Normal deseable' && this.interHdl === 'Normal deseable' && this.interLdl === 'Normal deseable' && this.tencion <= 120) {
      this.comorbilidadCon = 'Si';
    } else {
      this.comorbilidadCon = 'No';
    }

  }

  saveData(){
    let infoFisiologico = [];
    infoFisiologico.push({ question: parseInt(this.questions[0].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.dextrom });
    infoFisiologico.push({ question: parseInt(this.questions[1].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.colesterol });
    infoFisiologico.push({ question: parseInt(this.questions[2].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.trigliceridos });
    infoFisiologico.push({ question: parseInt(this.questions[3].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.hdl });
    infoFisiologico.push({ question: parseInt(this.questions[4].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.ldl });
    infoFisiologico.push({ question: parseInt(this.questions[5].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.comorbilidad });
    infoFisiologico.push({ question: parseInt(this.questions[6].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.comorbilidadCon });
    if (this.onlineOffline === true) {
      this.service.detalleInterven(infoFisiologico).subscribe((result: any) => {
        console.log(result);
      });
    } else {
      for(let i = 0; i<infoFisiologico.length; i++) {
      this._service.addDetalleInter(infoFisiologico[i]).
      then(data => {
        console.log(data);
      }).catch(error => {
        console.error(error);
      });
      }
    }

    let infoInterp = [];
    infoInterp.push({ intervencion: parseInt(this.intervencion), participante: parseInt(this.idPar), nombre: 'Categoría dextrometrica', resultado: this.interDextrom, recomendacion: '', dimension: 'Bioquímica' });
    infoInterp.push({ intervencion: parseInt(this.intervencion), participante: parseInt(this.idPar), nombre: 'Categoría Colesterol', resultado: this.interColest, recomendacion: '', dimension: 'Bioquímica' });
    infoInterp.push({ intervencion: parseInt(this.intervencion), participante: parseInt(this.idPar), nombre: 'Categoría Triglicéridos', resultado: this.interTriglic, recomendacion: '', dimension: 'Bioquímica' });
    infoInterp.push({ intervencion: parseInt(this.intervencion), participante: parseInt(this.idPar), nombre: 'Categoría HDL', resultado: this.interHdl, recomendacion: '', dimension: 'Bioquímica' });
    infoInterp.push({ intervencion: parseInt(this.intervencion), participante: parseInt(this.idPar), nombre: 'Categoría LDL', resultado: this.interLdl, recomendacion: '', dimension: 'Bioquímica' });
    if (this.onlineOffline === true) {
      this.service.insertInterpretacion(infoInterp).subscribe((result: any) => {
        if(result.text() == 'ok') {
          this.router.navigate(['/salud/jorActiva/control']);
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
    this.router.navigate(['/salud/jorActiva/control']);
    }
  }

}
