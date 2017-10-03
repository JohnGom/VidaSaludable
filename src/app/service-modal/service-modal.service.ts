import { ListEncargadosComponent } from './../coordinador/info-jornada/list-encargados/list-encargados.component';
import { UpdateUserComponent } from './../administrador/usuarios/update-user/update-user.component';
import { NewUserComponent } from './../administrador/usuarios/new-user/new-user.component';
import { UpdateJornadaComponent } from './../coordinador/info-jornada/update-jornada/update-jornada.component';
import { NewJornadaComponent } from './../coordinador/info-jornada/new-jornada/new-jornada.component';
import { NewProgramComponent } from './../coordinador/info-programa/new-program/new-program.component';
import { UpdateProgramComponent } from './../coordinador/info-programa/update-program/update-program.component';
import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Injectable()
export class ServiceModalService {

  constructor(public dialog: MdDialog) { }

  createProgram(): Observable<Object> {
    let dialogRef = this.dialog.open(NewProgramComponent);
    return dialogRef.afterClosed();
  }

  createJornada(): Observable<Object> {
    let dialogRef = this.dialog.open(NewJornadaComponent);
    return dialogRef.afterClosed();
  }
  
  createUser(): Observable<Object> {
    let dialogRef = this.dialog.open(NewUserComponent);
    return dialogRef.afterClosed();
  }

  updateProgram(program: Object): Observable<Object> {
    let dialogRef = this.dialog.open(UpdateProgramComponent, {
      data: program
    });
    return dialogRef.afterClosed();
  }

  updateJornada(jornada: Object): Observable<Object> {
    let dialogRef = this.dialog.open(UpdateJornadaComponent, {
      data: jornada
    });
    return dialogRef.afterClosed();
  }

  updateUser(user: Object): Observable<Object> {
    let dialogRef = this.dialog.open(UpdateUserComponent, {
      data: user
    });
    return dialogRef.afterClosed();
  }

  listEncargado(user: Object): Observable<Object> {
    let dialogRef = this.dialog.open(ListEncargadosComponent, {
      data: user
    });
    return dialogRef.afterClosed();
  }

}
