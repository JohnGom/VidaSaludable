import { ServiceModalService } from './../../service-modal/service-modal.service';
import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-presentacion-final',
  templateUrl: './presentacion-final.component.html',
  styleUrls: ['./presentacion-final.component.css']
})
export class PresentacionFinalComponent implements OnInit {

  @ViewChild('imprimir') el: ElementRef;

  public jornada: any;
  public idPar: any;
  public correo: string;
  public intervencion: any;
  public dataSource = [];
  public observacion: string;
  public result;
  public fechaInter: Date;
  public fechaSegui: Date;

  constructor(private service: InterpretationService,
              public modalService: ServiceModalService,
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
    interven.correo = this.correo;
    interven.id = this.intervencion;
    this.service.updateIntervention(interven).subscribe((result: any) => {
       if(result.text() == 'ok') {
         this.router.navigate(['/salud/jrna']);
       }
    });
  }

  sendEmail(divName){
    var docHead = document.head.outerHTML;
    var printContents = document.getElementById(divName).outerHTML;
    let interven: any = new Object;
    interven.observacion = this.observacion;
    interven.resultado = this.result;
    interven.interpretaciones = this.dataSource;
    this.modalService.SendEmail(interven).subscribe((data: any) => {
      if (data) {
        this.correo = data.correo;
        alert("Correo Enviado");
      }
    });
  }

  printDiv(divName) {
  var docHead = document.head.outerHTML;
  var printContents = document.getElementById(divName).outerHTML;
  
  var winAttr = "location=yes, statusbar=no, menubar=no, titlebar=no, toolbar=no,dependent=no, width=865, height=600, resizable=yes, screenX=200, screenY=200, personalbar=no, scrollbars=yes";

  var newWin = window.open("", "_blank", winAttr);
  var writeDoc = newWin.document;
  writeDoc.open();
  writeDoc.write('<!doctype html><html>' + docHead + '<body onLoad="window.print()">' + printContents + '</body></html>');
  writeDoc.close();
  newWin.focus();
  }

}
