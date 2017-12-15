import { IntervencionesService } from './../../servicios/offline/intervencion/intervenciones.service';
import { INTER_FISIOLOGICA } from './../../reducer/reducers';
import { ShareDataService } from './../../servicios/sharedata/share-data.service';
import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import _ from 'lodash';

@Component({
  selector: 'app-fisiologicas',
  templateUrl: './fisiologicas.component.html',
  styleUrls: ['./fisiologicas.component.css']
})
export class FisiologicasComponent {
  valorpeso = '';
  date: Date;
  weight: number;
  age: number;
  size: number;
  perabdomen: number;
  icminfo: number;
  tenciona: string;
  sistolica: number;
  diastolica: number;
  frecardiaca: number;
  sickness:string;
  medcoles: string;
  public interAbdomen;
  public interIcm;
  public interCardiaca;
  public interTension;
  public jornada: any;
  public idPar: any;
  public intervencion: any;
  public questions: object;
  public stateBio: boolean;

  public onlineOffline: boolean = navigator.onLine;
 
  constructor(private service: InterpretationService,
              private store:Store<any>,
              private shareservice: ShareDataService,
              private router: Router,
              private _service: IntervencionesService) {
    this.store.select('people').subscribe((result) => {
      this.jornada = result.jornada;
      this.date = result.date;
      this.idPar = result.idpar;
      this.intervencion = result.inter;
    });
    this.store.select('bio').subscribe((result) => {
      this.stateBio = result;
    });
  }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions() {
    if (this.onlineOffline === true) {
      this.service.getQuestions('fisiologica').subscribe(
        data => {
        this.questions = data.json();
      });
    } else {
      this._service.getQuestionByDimen().
      then(data => {
        let info: any = data;
        this.questions = _.filter(info, (o) => { return o.dimension === 'fisiologica' });
        console.log(this.questions);
      }).catch(error => {
        console.error(error);
      });
    }
  }

  calculeAge(fecha){
    var edad = 0;
    let hoy=new Date()

   let diaActual = hoy.getDate();
   let mesActual = hoy.getMonth() + 1;
   let yearActual = hoy.getFullYear();

   if(diaActual < 10) { diaActual = 0 + diaActual; }
   if(mesActual < 10) { mesActual = 0 + mesActual; }
  
   var array_fecha = fecha.split("-")
   let year = array_fecha[0];
   let mes = array_fecha[1];
   let dia = array_fecha[2];
  
   if(year >= yearActual){

   } else if ( (mes >= mesActual) && (dia > diaActual) ) { 
     edad = (yearActual  - 1 ) - year;
   }
   else {
     edad = yearActual - year;
   }
   this.age = edad;
  }

  infoICM(){
    this.icminfo = this.weight/((this.size/100)^2);
  }
  infoTalla (info) {
    this.icminfo = this.weight/((info/100)^2);
    if (this.icminfo < 18.5) {
      this.interIcm = this.icminfo + ', bajo peso';
    } else if (this.icminfo >= 18.5 &&  this.icminfo <= 24.9) {
      this.interIcm = this.icminfo + ', normal o peso saludable';
    } else if (this.icminfo >= 25.0 &&  this.icminfo <= 29.9) {
      this.interIcm = this.icminfo + ', sobrepeso';
    } else if (this.icminfo >= 30.0) {
      this.interIcm = this.icminfo + ', obesidad';
    }
  }

  infoAbdomen(info) {
    if (info > 88) {
      this.interAbdomen = info + ', No saludable';
    } else {
      this.interAbdomen = info + ', Saludable'
    }
  }

  infoTension(info: number) {
    if(this.sistolica < 120 && info < 80) {
      this.tenciona = this.sistolica+'/'+info;
      this.interTension = this.tenciona + '. Normal';
    } else if(this.sistolica >= 120 && this.sistolica <= 139 && info >= 80 && info <= 89) {
      this.tenciona = this.sistolica+'/'+info;
      this.interTension = this.tenciona + '. Pre hipertensión';
    } else if(this.sistolica >= 140 && this.sistolica <= 159 && info >= 90 && info <= 99) {
      this.tenciona = this.sistolica+'/'+info;
      this.interTension = this.tenciona + '. Hipertensión Estado 1';
    } else if(this.sistolica >= 160 && info >= 100) {
      this.tenciona = this.sistolica+'/'+info;
      this.interTension = this.tenciona + '. Hipertensión Estado 2';
    } else {
      alert("Los valores Sistólica y Diastólica no son logicos");
    }
  }

  infoFcardiaca(info) {
    if (info>=60 && info <= 100) {
      this.interCardiaca = info + ', normal';
    } else if (info > 100){
      this.interCardiaca = info + ', taquicardia';
    } else if (info < 60){
      this.interCardiaca = info + ', bradicardia';
    }
  }

  saveData(){
    let interFisio: any = new Object;
    interFisio.icm = this.icminfo;
    interFisio.abdomen = this.perabdomen;
    interFisio.tencion = this.tenciona;
    interFisio.sick = this.sickness;
    interFisio.medicamentos = this.medcoles;
    this.store.dispatch({ type: INTER_FISIOLOGICA, payload: interFisio });

    let infoFisiologico = [];
    infoFisiologico.push({ question: parseInt(this.questions[0].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.age });
    infoFisiologico.push({ question: parseInt(this.questions[1].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.weight });
    infoFisiologico.push({ question: parseInt(this.questions[2].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.size });
    infoFisiologico.push({ question: parseInt(this.questions[3].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.perabdomen });
    infoFisiologico.push({ question: parseInt(this.questions[4].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.icminfo });
    infoFisiologico.push({ question: parseInt(this.questions[5].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.tenciona });
    infoFisiologico.push({ question: parseInt(this.questions[6].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.frecardiaca });
    infoFisiologico.push({ question: parseInt(this.questions[7].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.sickness });
    infoFisiologico.push({ question: parseInt(this.questions[8].id), intervened: parseInt(this.idPar), jornada: parseInt(this.jornada), respuesta: this.medcoles });
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
    infoInterp.push({ intervencion: parseInt(this.intervencion), participante: parseInt(this.idPar), nombre: 'ICM', resultado: this.interIcm, recomendacion: '', dimension: 'Fisiológica' });
    infoInterp.push({ intervencion: parseInt(this.intervencion), participante: parseInt(this.idPar), nombre: 'Perímetro Abdominal', resultado: this.interAbdomen, recomendacion: '', dimension: 'Fisiológica' });
    infoInterp.push({ intervencion: parseInt(this.intervencion), participante: parseInt(this.idPar), nombre: 'Categoría TA', resultado: this.interTension, recomendacion: '', dimension: 'Fisiológica' });
    infoInterp.push({ intervencion: parseInt(this.intervencion), participante: parseInt(this.idPar), nombre: 'Categoría FC', resultado: this.interCardiaca, recomendacion: '', dimension: 'Fisiológica' });
    if (this.onlineOffline === true) {
      this.service.insertInterpretacion(infoInterp).subscribe((result: any) => {
        if(result.text() == 'ok') {
          if (this.stateBio === true) {
            this.router.navigate(['/salud/jorActiva/bio']);
          } else {
            this.router.navigate(['/salud/jorActiva/control']);
          }
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
      if (this.stateBio === true) {
          this.router.navigate(['/salud/jorActiva/bio']);
        } else {
          this.router.navigate(['/salud/jorActiva/control']);
        }
    }
  }

}
