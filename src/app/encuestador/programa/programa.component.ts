import { EncuestadorComponent } from './../encuestador.component';
import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../servicios/programas/program.service';
import { Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { User } from '../../data/user';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})
export class ProgramaComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('currentUser')) || [];
  displayedColumns = ['idProgram', 'nameProgram', 'descriptionProgram', 'entityProgram'];
  dataSource = [];

  constructor(private service: ProgramService,
              private encuestador: EncuestadorComponent) {
    this.service.getPrograms(this.user).subscribe(
      data => {
      this.dataSource = data.json();
    })
   }

  ngOnInit() {
  }

  irJornada(id: number) {
    this.encuestador.selectTab(1, id);
  }

}
