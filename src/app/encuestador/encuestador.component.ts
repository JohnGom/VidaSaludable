import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuestador',
  templateUrl: './encuestador.component.html',
  styleUrls: ['./encuestador.component.css']
})
export class EncuestadorComponent implements OnInit {
  indexSelected: number;
  idprogram: number;
  constructor() { }

  ngOnInit() {
  }

  selectTab(index: number, id: number): void {
  this.indexSelected = index;
  this.idprogram = id;
}
}
