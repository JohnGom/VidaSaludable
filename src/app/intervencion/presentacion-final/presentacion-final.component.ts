import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-presentacion-final',
  templateUrl: './presentacion-final.component.html',
  styleUrls: ['./presentacion-final.component.css']
})
export class PresentacionFinalComponent implements OnInit {
  private jornada: any;
  private idPar: any;
  private intervencion: any;
  public dataSource = [];
  private observacion: string;
  private result;
  private fechaInter: Date;
  private fechaSegui: Date;
  constructor(private service: InterpretationService,
              private store:Store<any>,
              private router: Router,
              ) {
    this.store.select('people').subscribe((result) => {
      this.jornada = result.jornada;
      this.idPar = result.idpar;
      this.intervencion = result.inter;
    });

    this.store.select('puntaje').subscribe((result) => {
      if (result <= 60) {
        this.result = 'Puntaje: '+ result +'. Riesgo muy alto: Estilo de vida insaludable';
      } else if (result >= 61 && result <= 75) {
        this.result = 'Puntaje: '+ result +'. Riesgo alto: Estilo de vida saludable Regular'
      } else if (result >= 76 && result <= 90) {
        this.result = 'Puntaje: '+ result +'. Riesgo medio: Estilo de vida saludable Bueno'
      } else if (result >= 91) {
        this.result = 'Puntaje: '+ result +'. Riesgo bajo: Estilo de vida saludable Excelente'
      }
    });
   }

  ngOnInit() {
    this.getInterpretations();
  }

  public getInterpretations() {
    this.service.getInterpretations(this.intervencion).subscribe((data: Response) => {
      this.dataSource = data.json();
      console.log(this.dataSource);
    })
  }

  saveData() {
    let interven: any = new Object;
    interven.observacion = this.observacion;
    interven.resultado = this.result;
    interven.fechaInter = this.fechaInter;
    interven.fechaSegui = this.fechaSegui;
    interven.id = this.intervencion;
    this.service.updateIntervention(interven).subscribe((result: any) => {
       if(result.text() == 'ok') {
         this.router.navigate(['/salud/jrna']);
       }
    });
  }

}
