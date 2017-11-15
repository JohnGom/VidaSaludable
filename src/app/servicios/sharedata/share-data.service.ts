import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ShareDataService {
  public identification: number;
  public idJornada = 1;

  constructor() { }

  getInfo() {
    return this.idJornada;
  }

  setIdentification(id: number) {
    this.identification = id;
  }

  setIdJornada(id: number) {
    this.idJornada = id;
  }

}
