import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { JornadaService } from '../../servicios/jornadas/jornada.service';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css']
})
export class JornadaComponent implements OnInit {
  @Input('idprogram') id: number;
  dataSource = [];

  constructor(private service: JornadaService) {
    
    if(this.id !== undefined) {
    this.service.getJornadas(this.id).subscribe(
      data => {
      this.dataSource = data.json();
    })
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.id.currentValue !== undefined) {
    this.service.getJornadas(changes.id.currentValue).subscribe(
      data => {
      this.dataSource = data.json();
    })
    }
  }

  ngOnInit() {
    
  }

}
