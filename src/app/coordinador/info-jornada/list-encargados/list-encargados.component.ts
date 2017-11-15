import { JornadaService } from './../../../servicios/jornadas/jornada.service';
import { UserService } from './../../../servicios/users/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-list-encargados',
  templateUrl: './list-encargados.component.html',
  styleUrls: ['./list-encargados.component.css']
})
export class ListEncargadosComponent implements OnInit {
  public interviewers = [];
  public users;
  constructor(public dialogRef: MatDialogRef<ListEncargadosComponent>,
              public serviceUser: UserService,
              public jornadaServ: JornadaService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
              }

  ngOnInit() {
    this.users = this.data.encargados;
    console.log(this.data.encargados);    
    this.getEncargados();
  }

  getEncargados() {
    this.serviceUser.interviewers().subscribe((data: Response) => {
      this.interviewers = data.json();
      for(let i = 0; i < this.interviewers.length; i++){
        this.interviewers[i].state = false;
        for(let j = 0; j < this.users.length; j++) {
          if(this.interviewers[i].id === this.users[j].id) {
            this.interviewers[i].state = true;
          }
        }
      }
    })
  }

  onSelectOptionChange(value: any) {
   if(value.state === true) {
     for(let i = 0; i < this.interviewers.length; i++){
       if(this.interviewers[i].id === value.id){
         this.interviewers[i].state = false
       }
      }
   } else {
     for(let i = 0; i < this.interviewers.length; i++){
       if(this.interviewers[i].id === value.id){
         this.interviewers[i].state = true
       }
      }
    }
  }

  save() {
    console.log(this.interviewers);
    
    this.jornadaServ.insertEncargadoJor(this.interviewers, this.data.id).subscribe((result: any) => {
       console.log(result);
       if (result.text() == 'ok') {
          this.dialogRef.close({"updated": true});
       } else {
          this.dialogRef.close({"updated": false});
       } 
    });
  }
}
