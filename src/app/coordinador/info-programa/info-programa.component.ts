import { ServiceModalService } from './../../service-modal/service-modal.service';
import { ProgramService } from './../../servicios/programas/program.service';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-info-programa',
  templateUrl: './info-programa.component.html',
  styleUrls: ['./info-programa.component.css']
})
export class InfoProgramaComponent implements OnInit {

  public programs = [];
  constructor(public programService: ProgramService,
              public modalService: ServiceModalService) {}

  ngOnInit() {
    this.getPrograms();
  }

  public getPrograms() {
    this.programService.getallPrograms().subscribe((data: Response) => {
      this.programs = data.json();
      console.log(this.programs);
    })
  }

  public deleteJornada(id: number) {
    this.programService.deletePrograms(id).subscribe((result: any) => {
      console.log(result);
      if (result.text() == 'ok') {
        alert("Programa Eliminado");
      } else {
        alert("El programa no se pudo Eliminar");
      }
    })
  }

  public createPrograms() {
    this.modalService.createProgram().subscribe((data: any) => {
      console.log(data);
      if (data) {
        alert("Programa Creado");
      } else {
        alert("El programa no se pudo crear");
      }
    });
  }

  public updateProgram(program: Object) {
    this.modalService.updateProgram(program).subscribe((data: any) => {
      if (data) {
        alert("Programa Actualizado");
      } else {
        alert("El programa no se pudo actualizar");
      }
    });
  }
}
