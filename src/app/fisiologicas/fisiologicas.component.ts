import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

@Component({
  selector: 'app-fisiologicas',
  templateUrl: './fisiologicas.component.html',
  styleUrls: ['./fisiologicas.component.css']
})
export class FisiologicasComponent {
  valorpeso = '';
  date: DateModel;
  options: DatePickerOptions;
 
  constructor() {
    this.options = new DatePickerOptions();
  }

  ngOnInit() {
  }

  infoPeso(value: string) {
    console.log(value);
    this.valorpeso = value;
  } 

}
