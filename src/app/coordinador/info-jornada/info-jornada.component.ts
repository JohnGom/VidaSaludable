import { JornadaService } from './../../servicios/jornadas/jornada.service';
import { ServiceModalService } from './../../service-modal/service-modal.service';
import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-jornada',
  templateUrl: './info-jornada.component.html',
  styleUrls: ['./info-jornada.component.css']
})
export class InfoJornadaComponent implements OnInit {
   id: number;

  public jornadas = [];
  constructor(public jornadaservice: JornadaService,
              public modalService: ServiceModalService,
              private route: ActivatedRoute,) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['id']!=null){
          this.id = params['id']; 
      }
    });
    this.getJornadas();
  }

  public getJornadas() {
    this.jornadaservice.getallJornadas(this.id).subscribe((data: Response) => {
      this.jornadas = data.json();
      console.log(this.jornadas);
    })
  }

  public deleteJornada(id: number) {
    this.jornadaservice.deleteJornadas(id).subscribe((result: any) => {
      console.log(result);
      if (result.text() == 'ok') {
        alert("Jornada Eliminada");
        this.getJornadas();
      }
    })
  }

  public createJornada() {
    this.modalService.createJornada().subscribe((data: any) => {
      console.log(data);
      if (data) {
        alert("Jornada Creada");
        this.getJornadas();
      }
    });
  }

  public updateJornada(jornada: Object) {
    this.modalService.updateJornada(jornada).subscribe((data: any) => {
      console.log(data);
      if (data) {
        alert("Jornada Actualizada");
        this.getJornadas();
      }
    });
  }

  public listEncargados(users: Object) {
    this.modalService.listEncargado(users).subscribe((data: any) => {
      console.log(data);
      if (data) {
        alert("Encargados seleccionados");
        this.getJornadas();
      }
    });
  }

}

