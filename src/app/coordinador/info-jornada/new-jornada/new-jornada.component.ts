import { UserService } from './../../../servicios/users/user.service';
import { JornadaService } from './../../../servicios/jornadas/jornada.service';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import {MdOptionSelectionChange} from '@angular/material';

class Departamento {
  departamentoId: number;
  nombreDepartamento: string;
}

@Component({
  selector: 'app-new-jornada',
  templateUrl: './new-jornada.component.html',
  styleUrls: ['./new-jornada.component.css']
})
export class NewJornadaComponent implements OnInit {
  
  departmentControl: FormControl;
  filteredDepartment: Observable<any[]>;
  cityControl: FormControl = new FormControl();
  filteredCity: Observable<any[]>;
  public name: string;
  public department: Departamento;
  public city: string;
  public encargado: Object;
  public date: string;
  public tipo: string;
  public place: string;
  public state: string;
  public departments: any;
  public cities: any;

  states = [{name: 'Planeada'}, {name: 'Ejecutada'}, {name: 'Cancelada'}];
  types = [{name: 'Intramural'}, {name: 'Extramural'}];
  constructor(public jornadaService: JornadaService,
              public dialogRef: MdDialogRef<NewJornadaComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) {
                this.departmentControl = new FormControl();
              }      

  ngOnInit() {
    this.cityControl.disable();
    this.getdepartments();
    this.filteredDepartment = this.departmentControl.valueChanges
         .map(val => val ? this.filter(val) : this.departments.slice());
   }

   filter(val: string): string[] {
      return this.departments.filter(option =>
        option.nombreDepartamento.toLowerCase().indexOf(val.toLowerCase()) === 0);
   }
   filterCity(val: string): string[] {
      return this.cities.filter(option =>
        option.nombreCiudad.toLowerCase().indexOf(val.toLowerCase()) === 0);
   }

  getdepartments() {
    this.jornadaService.getDepartments().subscribe((result: any) => {
      this.departments = result.json();
    });
  }

  getcities(value: number) {
    this.jornadaService.getCities().subscribe((result: any) => {
      this.cities = result.json().filter((city) => {
        return city.departamentoId == value});
      console.log(this.cities);
    });
    this.filteredCity = this.cityControl.valueChanges
      .map(val => val ? this.filterCity(val) : this.cities.slice());
  }

  infoDep(evt: MdOptionSelectionChange, depar) {
    if(evt.source.selected !== false){
      this.cityControl.enable();
      this.getcities(depar);
    }
      
  }

  save() {
    let jornada: any = new Object;
    jornada.name = this.name
    jornada.programa = 1;
    jornada.department = this.department;
    jornada.city = this.city;
    jornada.encargado = this.encargado;
    jornada.date = this.date;
    jornada.tipo = this.tipo;
    jornada.place = this.place;
    jornada.state = this.state;
    this.jornadaService.saveJornadas(jornada).subscribe((result: any) => {
       if (result.created == true) {
          this.dialogRef.close({"created": true});
       } else {
          this.dialogRef.close({"created": false});
       }
    });
  }
}
