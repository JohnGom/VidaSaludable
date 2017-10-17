import { JornadaService } from './../../../servicios/jornadas/jornada.service';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {MdOptionSelectionChange} from '@angular/material';

@Component({
  selector: 'app-update-jornada',
  templateUrl: './update-jornada.component.html',
  styleUrls: ['./update-jornada.component.css']
})
export class UpdateJornadaComponent implements OnInit {

  departmentControl: FormControl = new FormControl();
  filteredDepartment: Observable<any[]>
  cityControl: FormControl = new FormControl();
  filteredCity: Observable<any[]>

  public id: number;
  public name: string;
  public department: string;
  public city: string;
  public infoEncargado: any;
  public date: string;
  public tipo: string;
  public place: string;
  public state: string;
  public bioquimica: boolean;
  public departments: any;
  public cities: any;

  states = [{name: 'Planeada'}, {name: 'Ejecutada'}, {name: 'Cancelada'}];
  types = [{name: 'Intramural'}, {name: 'Extramural'}];

  constructor(public jornadaService: JornadaService,
              public dialogRef: MdDialogRef<UpdateJornadaComponent>,
              @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    
    this.filljornada();
    this.getdepartments();
    this.filteredDepartment = this.departmentControl.valueChanges
         .map(val => val ? this.filter(val) : this.departments.slice());
    
  }
  filterInitialCities(departments: any) {
    let index = departments.findIndex((depart) => {
      return depart.nombreDepartamento == this.department
    });
    this.getcities(departments[index].departamentoId);
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
      this.filterInitialCities(result.json());
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

  filljornada() {
      this.id = this.data.id;
      this.name = this.data.name;
      this.department = this.data.department;
      this.infoEncargado = this.data.infoEncargado;
      this.city = this.data.city;
      this.date = this.data.date;
      this.tipo = this.data.tipo;
      this.place = this.data.place;
      this.bioquimica = this.data.bioquimica;
      this.state = this.data.state;
      console.log(this.state);
  }

  update() {
    console.log(this.department);
    let jornada: any = new Object;
    jornada.id = this.id;
    jornada.name = this.name;
    jornada.department = this.department;
    jornada.city = this.city;
    jornada.date = this.date;
    jornada.tipo = this.tipo;
    jornada.place = this.place;
    jornada.state = this.state;
    jornada.bioquimica = this.bioquimica;
    this.jornadaService.updateJornadas(jornada).subscribe((result: any) => {
      if (result.updated == true) {
          this.dialogRef.close({"updated": true});
       } else {
          this.dialogRef.close({"updated": false});
       } 
    });
  }

}
