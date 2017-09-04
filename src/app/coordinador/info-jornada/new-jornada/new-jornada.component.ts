import { JornadaService } from './../../../servicios/jornadas/jornada.service';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-new-jornada',
  templateUrl: './new-jornada.component.html',
  styleUrls: ['./new-jornada.component.css']
})
export class NewJornadaComponent {

  public name: string;
  public department: string;
  public city: string;
  public encargado: Object;
  public date: string;
  public tipo: string;
  public place: string;

  constructor(public jornadaService: JornadaService,
              public dialogRef: MdDialogRef<NewJornadaComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) { }

  save() {
    let jornada: any = new Object;
    jornada.name = this.name
    jornada.programa = 1;
    jornada.department = this.department
    jornada.city = this.city;
    jornada.encargado = this.encargado;
    jornada.date = this.date;
    jornada.tipo = this.tipo;
    jornada.place = this.place;
    this.jornadaService.saveJornadas(jornada).subscribe((result: any) => {
       if (result.created == true) {
          this.dialogRef.close({"created": true});
       } else {
          this.dialogRef.close({"created": false});
       }
    });
  }
}
