import { JornadaService } from './../../servicios/jornadas/jornada.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  id: number;
  public intervenciones = [];
  constructor(public jornadaservice: JornadaService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['id']!=null){
          this.id = params['id'];
          this.getJornadas(this.id);
      }
    });
  }

  public getJornadas(id: number) {
    this.jornadaservice.getInterventions(id).subscribe((data: Response) => {
      this.intervenciones = data.json();
      console.log(this.intervenciones);
    })
  }

}
