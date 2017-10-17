import { INCREMENT_PUNTAJE } from './../../reducer/reducers';
import { Component, OnInit } from '@angular/core';
import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-nutricional',
  templateUrl: './nutricional.component.html',
  styleUrls: ['./nutricional.component.css']
})
export class NutricionalComponent implements OnInit {
  private jornada: any;
  private idPar: any;
  private intervencion: any;
  private questions: object;
  fruits: number;
  vegetables: number;
  grease: string;
  sal: string;
  sugar: string;
  foods: string;
  water: string
  private interFruits: string;
  private interVegetable: string;
  private interGrease: string;
  private interSal: string;
  private interSugar: string;
  private interFood: string;
  private interWater: string;
  private recoFruits: string;
  private recoVegetable: string;
  private recoGrease: string;
  private recoSal: string;
  private recoSugar: string;
  private recoFood: string;
  private recoWater: string;
  
  constructor(private service: InterpretationService,
              private store:Store<any>,
              private router: Router) { 
    this.store.select('people').subscribe((result) => {
      this.jornada = result.jornada;
      this.idPar = result.idpar;
      this.intervencion = result.inter;
    });
  }

  ngOnInit() {
  this.getQuestions();
  }

  getQuestions() {
    this.service.getQuestions('nutricional').subscribe(
      data => {
      this.questions = data.json();
      console.log(this.questions);
    })
  }

  infoFruit(value) {
    if(value < 4) {
      this.interFruits = 'Consumo insuficiente de fruta';
      this.recoFruits = '';
    } else if(value >=4 && value <= 6) {
      this.interFruits = 'Consumo adecuado de fruta';
      this.recoFruits = '';
    } else if(value > 6) {
      this.interFruits = 'Consumo excesivo de fruta';
      this.recoFruits = '';
    } 
  }

  infoVegetables(value) {
     if(value < 4) {
      this.interVegetable = 'Consumo insuficiente de verduras';
      this.recoVegetable = '';
    } else if(value >=4 && value <= 6) {
      this.interVegetable = 'Consumo adecuado de verduras';
      this.recoVegetable = '';
    } else if(value > 6) {
      this.interVegetable = 'Consumo excesivo de verduras';
      this.recoVegetable = '';
    } 
  }

  onChangeInfoGrease(value) {
     if (value === 'Siempre'){
      this.interGrease = 'Control adecuado de grasas';
      this.recoVegetable = '';
    } else if (value === 'Con alguna frecuencia'){
      this.interGrease = 'Control regular de grasas';
      this.recoVegetable = '';
    } else {
      this.interGrease = 'Control Inadecuado de grasas';
      this.recoVegetable = '';
    }
  }

  onChangeInfoSal(value) {
     if (value === 'Siempre'){
      this.interSal = 'Control adecuado del consumo de sal';
      this.recoSal= '';
    } else if (value === 'Con alguna frecuencia'){
      this.interSal = 'Control regular del consumo de sal';
      this.recoSal= '';
    } else {
      this.interSal = 'Control Inadecuado de consumo de sal';
      this.recoSal= '';
    }
  }

  onChangeInfoSugar(value) {
    if (value === 'Siempre'){
      this.interSugar = 'Control adecuado del consumo de azúcar';
      this.recoSugar= '';
    } else if (value === 'Con alguna frecuencia'){
      this.interSugar = 'Control regular del consumo de azúcar';
      this.recoSugar= '';
    } else {
      this.interSugar = 'Control Inadecuado de consumo de azúcar';
      this.recoSugar= '';
    }
  }

  onChangeInfoFoods(value) {
    if (value === 'Siempre'){
      this.interFood = 'Control adecuado de número de comidas';
      this.recoFood = '';
    } else if (value === 'Con alguna frecuencia'){
      this.interFood = 'Control regular de número de comidas';
      this.recoFood = '';
    } else {
      this.interFood = 'Control Inadecuado de Número de comidas';
      this.recoFood = '';
    }
  }

  onChangeInfoWater(value) {
    if (value === 'Siempre'){
      this.interWater = 'Control adecuado de agua';
      this.recoWater = '';
    } else if (value === 'Con alguna frecuencia'){
      this.interWater = 'Control regular de agua';
      this.recoWater = '';
    } else {
      this.interWater = 'Control Inadecuado de agua';
      this.recoWater = '';
    }
  }

  increPuntaje() {
    let puntaje = 0;
    if(this.interFruits === 'Consumo adecuado de fruta') {
      puntaje += 3;
    } else if (this.interFruits === 'Consumo excesivo de fruta') {
      puntaje += 1.5;
    } 
    
    if (this.interVegetable === 'Consumo adecuado de verduras') {
      puntaje += 3;
    } else if (this.interVegetable === 'Consumo excesivo de verduras') {
      puntaje += 1.5;
    }

    if (this.interGrease === 'Control adecuado de grasas') {
      puntaje += 3;
    } else if (this.interGrease === 'Control regular de grasas') {
      puntaje += 1.5;
    }

    if (this.interSal === 'Control adecuado del consumo de sal') {
      puntaje += 3;
    } else if (this.interSal === 'Control regular del consumo de sal') {
      puntaje += 1.5;
    }

    if (this.interSugar === 'Control adecuado del consumo de azúcar') {
      puntaje += 3;
    } else if (this.interSugar === 'Control regular del consumo de azúcar') {
      puntaje += 1.5;
    }

    if (this.interFood === 'Control adecuado de número de comidas') {
      puntaje += 2;
    } else if (this.interFood === 'Control regular de número de comidas') {
      puntaje += 1;
    }

    if (this.interWater === 'Control adecuado de agua') {
      puntaje += 3;
    } else if (this.interWater = 'Control regular de agua') {
      puntaje += 1.5;
    }

    this.store.dispatch({ type: INCREMENT_PUNTAJE, payload: puntaje});
  }

   saveData(){
    this.increPuntaje();
    let infoFisiologico = [];
    infoFisiologico.push({ question: this.questions[0].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.fruits })
    infoFisiologico.push({ question: this.questions[1].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.vegetables })
    infoFisiologico.push({ question: this.questions[2].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.grease })
    infoFisiologico.push({ question: this.questions[3].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.sal })
    infoFisiologico.push({ question: this.questions[4].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.sugar })
    infoFisiologico.push({ question: this.questions[5].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.foods })
    infoFisiologico.push({ question: this.questions[6].id, intervened: this.idPar, jornada: this.jornada, respuesta: this.water })
    this.service.detalleInterven(infoFisiologico).subscribe((result: any) => {
       console.log(result);
    });

    let infoInterp = [];
    infoInterp.push({ intervencion: this.intervencion, participante: this.idPar, nombre: 'Frutas', resultado: this.interFruits, recomendacion: this.recoFruits, dimension: 'Nutrición' });
    infoInterp.push({ intervencion: this.intervencion, participante: this.idPar, nombre: 'Verduras', resultado: this.interVegetable, recomendacion: this.recoVegetable, dimension: 'Nutrición' });
    infoInterp.push({ intervencion: this.intervencion, participante: this.idPar, nombre: 'Grasas', resultado: this.interGrease, recomendacion: this.recoGrease, dimension: 'Nutrición' });
    infoInterp.push({ intervencion: this.intervencion, participante: this.idPar, nombre: 'Sal', resultado: this.interSal, recomendacion: this.recoSal, dimension: 'Nutrición' });
    infoInterp.push({ intervencion: this.intervencion, participante: this.idPar, nombre: 'Azúcar', resultado: this.interSugar, recomendacion: this.recoSugar, dimension: 'Nutrición' });
    infoInterp.push({ intervencion: this.intervencion, participante: this.idPar, nombre: 'Comidas diarias', resultado: this.interFood, recomendacion: this.recoFood, dimension: 'Nutrición' });
    infoInterp.push({ intervencion: this.intervencion, participante: this.idPar, nombre: 'Agua', resultado: this.interWater, recomendacion: this.recoWater, dimension: 'Nutrición' });
    this.service.insertInterpretacion(infoInterp).subscribe((result: any) => {
       if(result.text() == 'ok') {
        this.router.navigate(['/salud/jorActiva/sueno']);
      }
    });
  }

}
