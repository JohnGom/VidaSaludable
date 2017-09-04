import { JornadaService } from './../../../servicios/jornadas/jornada.service';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-update-jornada',
  templateUrl: './update-jornada.component.html',
  styleUrls: ['./update-jornada.component.css']
})
export class UpdateJornadaComponent implements OnInit {

  public id: number;
  public name: string;
  public department: string;
  public city: string;
  public infoEncargado: any;
  public date: string;
  public tipo: string;
  public place: string;

  constructor(public jornadaService: JornadaService,
              public dialogRef: MdDialogRef<UpdateJornadaComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.filljornada();
  }

  filljornada() {
      this.id = this.data.id;
      this.name = this.data.name;
      this.department = this.data.department;
      this.infoEncargado = this.data.infoEncargado;
      this.city = this.data.city;
      this.date = this.data.date;
      this.tipo = this.data.tipo;
      this.place = this.data.place;
  }

  update() {
    let jornada: any = new Object;
    jornada.id = this.id;
    jornada.name = this.name;
    jornada.department = this.department;
    jornada.city = this.city;
    jornada.encargado = this.infoEncargado.id;
    jornada.date = this.date;
    jornada.tipo = this.tipo;
    jornada.place = this.place;
    this.jornadaService.updateJornadas(jornada).subscribe((result: any) => {
      if (result.updated == true) {
          this.dialogRef.close({"updated": true});
       } else {
          this.dialogRef.close({"updated": false});
       } 
    });
  }

}
