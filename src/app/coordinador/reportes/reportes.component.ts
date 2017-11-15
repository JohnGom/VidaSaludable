import { JornadaService } from './../../servicios/jornadas/jornada.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material';
import { TableDataSource } from './table-data-source/table-data-source.component';
import { Subject } from 'rxjs/Subject';
import _ from 'lodash';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  id: number;
  public reports = [];
  displayedColumns = ['firstname', 'lastname', 'resultado', 'fecha'];
  dataPeople: any;
  subjectDataTable: Subject<{}> = new Subject;
  dataSource: TableDataSource;
  public estado: boolean = false
  public doughnutChartData: number[] = [0, 0];
  public doughnutChartLabels: string[] = ['Mujeres', 'Hombres'];;
  public doughnutChartType: string = 'doughnut';

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['18 - 26', '27 - 54', 'Mayor de 54'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [0, 0, 0, 0], label: 'Mujeres'},
    {data: [0, 0, 0, 0], label: 'Hombres'}
  ];

  public female;
  public male;

  @ViewChild( MatPaginator ) paginator: MatPaginator;
  @ViewChild( MatSort ) sort: MatSort;
  @ViewChild( 'filter' ) filter: ElementRef;

  constructor(public jornadaservice: JornadaService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['id']!=null){
          this.id = params['id'];
          this.getJornadas(this.id);
      }
    });
  }

  genderInfo(info: any) {
    this.female = _.filter(info, (o) => { return o.cliente.gender === 'Femenino' });
    this.male = _.filter(info, (o) => { return o.cliente.gender === 'Masculino' });
    this.doughnutChartData =  _.concat(this.female.length, this.male.length);
  }

  processInfo(labels, type) {
    for (let i = 0; i < labels.length; i++) {
      let info = _.filter(this.female, (o) => { 
      let index = _.findIndex(o.interpretaciones, (q) => { return q.nombre == type; });
      return o.interpretaciones[index].resultado === labels[i] });
      this.barChartData[0].data[i] = info.length;
    }
    for (let i = 0; i < labels.length; i++) {
      let info = _.filter(this.male, (o) => { 
      let index = _.findIndex(o.interpretaciones, (q) => { return q.nombre == type; });
      return o.interpretaciones[index].resultado === labels[i] });
      this.barChartData[1].data[i] = info.length;
    }
  }

  tableInfo(labels, type) {
    let data = [];
    for (let i = 0; i < labels.length; i++) {
      let info = _.filter(this.female, (o) => { 
      let index = _.findIndex(o.interpretaciones, (q) => { return q.nombre == type; });
      return o.interpretaciones[index].resultado === labels[i] });
      
      let info2 = _.filter(this.male, (o) => { 
      let index2 = _.findIndex(o.interpretaciones, (q) => { return q.nombre == type; });
      return o.interpretaciones[index2].resultado === labels[i] });

      let infomenor = _.filter(info, (s) => { return parseInt(s.detalles[0].respuesta) <= 26 });
      let infomedio = _.filter(info, (s) => { return parseInt(s.detalles[0].respuesta) > 26 && parseInt(s.detalles[0].respuesta) <= 54 });
      let infomayor = _.filter(info, (s) => { return parseInt(s.detalles[0].respuesta) > 54 });
      
      let info2menor = _.filter(info2, (s) => { return parseInt(s.detalles[0].respuesta) <= 26 });
      let info2medio = _.filter(info2, (s) => { return parseInt(s.detalles[0].respuesta) > 26 && parseInt(s.detalles[0].respuesta) <= 54 });
      let info2mayor = _.filter(info2, (s) => { return parseInt(s.detalles[0].respuesta) > 54 });

      data.push({
        'categoria': labels[i],
        'womanYoung': infomenor.length,
        'manYoung': info2menor.length,
        'womanAdult': infomedio.length,
        'manAdult': info2medio.length,
        'womanOld': infomayor.length,
        'manOld': info2mayor.length,
      });
    }
    this.reports = data;
  }

  infoSmoke() {
    this.estado = true;
    this.barChartLabels = ['No fuma', 'Dependencia leve', 'Dependencia moderada', 'Dependencia alta'];
    let labels = this.barChartLabels;
    this.processInfo(labels, 'Fumar');
    this.tableInfo(labels, 'Fumar');
  }
  infoDrink() {
    this.estado = true;
    this.barChartLabels = ['Abstemio', 'Bebedor social', 'Consumo de riesgo', 'Consumo perjudicial', 'Dependencia alcohólica'];
    let labels = this.barChartLabels;
    this.processInfo(labels, 'Alcohol');
    this.tableInfo(labels, 'Alcohol');
  }

  infoStress() {
    this.estado = true;
    this.barChartLabels = ['Control adecuado', 'Control regular', 'Control Inadecuado'];
    let labels = this.barChartLabels;
    this.processInfo(labels, 'Estrés');
    this.tableInfo(labels, 'Estrés');
  }

  infoExercise() {
    this.estado = true;
    this.barChartLabels = ['Físicamente activo', 'Recientemente activo físicamente', 'Físicamente inactivo'];
    let labels = this.barChartLabels;
    this.processInfo(labels, 'Ejercicio Fisico');
    this.tableInfo(labels, 'Ejercicio Fisico');
  }

  infoFruit() {
    this.estado = true;
    this.barChartLabels = ['Consumo insuficiente de fruta', 'Consumo adecuado de fruta', 'Consumo excesivo de fruta'];
    let labels = this.barChartLabels;
    this.processInfo(labels, 'Frutas');
    this.tableInfo(labels, 'Frutas');
  }

  infoVegetables() {
    this.estado = true;
    this.barChartLabels = ['Consumo insuficiente de verduras', 'Consumo adecuado de verduras', 'Consumo excesivo de verduras'];
    let labels = this.barChartLabels;
    this.processInfo(labels, 'Verduras');
    this.tableInfo(labels, 'Verduras');
  }

  InfoGrease() {
    this.estado = true;
    this.barChartLabels = ['Control adecuado de grasas', 'Control regular de grasas', 'Control Inadecuado de grasas'];
    let labels = this.barChartLabels;
    this.processInfo(labels, 'Grasas');
    this.tableInfo(labels, 'Grasas');
  }

  InfoSal() {
    this.estado = true;
    this.barChartLabels = ['Control adecuado del consumo de sal', 'Control regular del consumo de sal', 'Control Inadecuado de consumo de sal'];
    let labels = this.barChartLabels;
    this.processInfo(labels, 'Sal');
    this.tableInfo(labels, 'Sal');
  }

  InfoSugar() {
    this.estado = true;
    this.barChartLabels = ['Control adecuado de azúcar', 'Control regular de azúcar', 'Control Inadecuado de azúcar'];
    let labels = ['Control adecuado del consumo de azúcar', 'Control regular del consumo de azúcar', 'Control Inadecuado de consumo de azúcar'];
    this.processInfo(labels, 'Azúcar');
    this.tableInfo(labels, 'Azúcar');
  }

  InfoFoods() {
    this.estado = true;
    this.barChartLabels = ['Control adecuado de comidas', 'Control regular de comidas', 'Control Inadecuado de comidas'];
    let labels = ['Control adecuado de número de comidas', 'Control regular de número de comidas', 'Control Inadecuado de Número de comidas'];
    this.processInfo(labels, 'Comidas diarias');
    this.tableInfo(labels, 'Comidas diarias');
  }

  InfoWater() {
    this.estado = true;
    this.barChartLabels = ['Control adecuado de agua', 'Control regular de agua', 'Control Inadecuado de agua'];
    let labels = this.barChartLabels;
    this.processInfo(labels, 'Agua');
    this.tableInfo(labels, 'Agua');
  }

  InfoSueno() {
    this.estado = true;
    this.barChartLabels = ['Anormal. Poco sueño', 'Normal', 'Anormal. Excesivo sueño'];
    let labels = this.barChartLabels;
    this.processInfo(labels, 'Sueño');
    this.tableInfo(labels, 'Sueño');
  }

  InfoEspiritual() {
    this.estado = true;
    this.barChartLabels = ['Espiritual', 'Moderadamente espiritual', 'Poco Espiritual', 'No Espiritual'];
    let labels = this.barChartLabels;
    this.processInfo(labels, 'Espiritualidad');
    this.tableInfo(labels, 'Espiritualidad');
  }

  InfoFinal() {
    let data = [];
    this.estado = true;
    console.log(this.female);
    
    this.barChartLabels = ['Riesgo Bajo: Excelente EV', 'Riesgo Medio: Buen EV', 'Riesgo Alto: Deficiente EV', 'Riesgo Muy Alto: Precario EV'];
    let labels = ['Riesgo bajo', 'Riesgo medio', 'Riesgo alto', 'Riesgo muy alto'];
    for (let i = 0; i < labels.length; i++) {
      let final = _.filter(this.female, (o) => { return o.resultado.search(labels[i]) >= 0 });
      this.barChartData[0].data[i] = final.length;

      let final2 = _.filter(this.male, (q) => { return q.resultado.search(labels[i]) >= 0 }); 
      this.barChartData[1].data[i] = final2.length;

      let infomenor = _.filter(final, (s) => { return parseInt(s.detalles[0].respuesta) <= 26 });
      let infomedio = _.filter(final, (s) => { return parseInt(s.detalles[0].respuesta) > 26 && parseInt(s.detalles[0].respuesta) <= 54 });
      let infomayor = _.filter(final, (s) => { return parseInt(s.detalles[0].respuesta) > 54 });
      
      let info2menor = _.filter(final2, (s) => { return parseInt(s.detalles[0].respuesta) <= 26 });
      let info2medio = _.filter(final2, (s) => { return parseInt(s.detalles[0].respuesta) > 26 && parseInt(s.detalles[0].respuesta) <= 54 });
      let info2mayor = _.filter(final2, (s) => { return parseInt(s.detalles[0].respuesta) > 54 });

      data.push({
        'categoria': labels[i],
        'womanYoung': infomenor.length,
        'manYoung': info2menor.length,
        'womanAdult': infomedio.length,
        'manAdult': info2medio.length,
        'womanOld': infomayor.length,
        'manOld': info2mayor.length,
      });
    }
    console.log(data);
    
    this.reports = data;
  }

  public getJornadas(id: number) {
    this.jornadaservice.getInterventions(id).subscribe((data: Response) => {
      this.subjectDataTable.next(data.json());
      console.log(data.json());
      this.genderInfo(data.json())
      this.dataPeople = { data: data.json(), dataChange: this.subjectDataTable };
      this.getDataSource();
    })
  }

  getDataSource() {
    this.dataSource = new TableDataSource( this.dataPeople, this.paginator, this.sort );
  }

  filterKeyUp()  {
    if (!this.dataSource) { return; }
      this.dataSource.filter = this.filter.nativeElement.value;
  }

   public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
