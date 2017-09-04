import { JornadaService } from './../../servicios/jornadas/jornada.service';
import { ServiceModalService } from './../../service-modal/service-modal.service';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-info-jornada',
  templateUrl: './info-jornada.component.html',
  styleUrls: ['./info-jornada.component.css']
})
export class InfoJornadaComponent implements OnInit {

  public jornadas = [];
  constructor(public jornadaservice: JornadaService,
              public modalService: ServiceModalService) {}

  ngOnInit() {
    this.getJornadas();
  }

  public getJornadas() {
    this.jornadaservice.getallJornadas().subscribe((data: Response) => {
      this.jornadas = data.json();
      console.log(this.jornadas);
    })
  }

  public deleteJornada(id: number) {
    this.jornadaservice.deleteJornadas(id).subscribe((result: any) => {
      console.log(result);
      if (result.text() == 'ok') {
        alert("Programa Eliminado");
      } else {
        alert("El programa no se pudo Eliminar");
      }
    })
  }

  public createJornada() {
    this.modalService.createJornada().subscribe((data: any) => {
      console.log(data);
      if (data) {
        alert("Jornada Creada");
      } else {
        alert("El jornada no se pudo crear");
      }
    });
  }

  public updateJornada(jornada: Object) {
    this.modalService.updateJornada(jornada).subscribe((data: any) => {
      console.log(data);
      if (data) {
        alert("Jornada Actualizada");
      } else {
        alert("La jornada no se pudo actualizar");
      }
    });
  }

}

