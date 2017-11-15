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
  public jornada: any;
  public idPar: any;
  public intervencion: any;
  public questions: object;
  public infoInter: object;
  fruits: number;
  vegetables: number;
  grease: string;
  sal: string;
  sugar: string;
  foods: string;
  water: string
  public interFruits: string;
  public interVegetable: string;
  public interGrease: string;
  public interSal: string;
  public interSugar: string;
  public interFood: string;
  public interWater: string;
  public recoFruits: string;
  public recoVegetable: string;
  public recoGrease: string;
  public recoSal: string;
  public recoSugar: string;
  public recoFood: string;
  public recoWater: string;
  
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
    });
    this.service.getInfoInterp('nutricion').subscribe(
      data => {
      this.infoInter = data.json();
    });
  }

  infoFruit(value) {
    if(value < 4) {
      this.interFruits = this.infoInter[0].categoria;
      this.recoFruits = this.infoInter[0].recomendacion;
    } else if(value >=4 && value <= 6) {
      this.interFruits = this.infoInter[1].categoria;
      this.recoFruits = this.infoInter[1].recomendacion;
    } else if(value > 6) {
      this.interFruits = this.infoInter[2].categoria;
      this.recoFruits = this.infoInter[2].recomendacion;
    } 
  }

  infoVegetables(value) {
     if(value < 4) {
      this.interVegetable = this.infoInter[3].categoria;
      this.recoVegetable = this.infoInter[3].recomendacion;
    } else if(value >=4 && value <= 6) {
      this.interVegetable = this.infoInter[4].categoria;
      this.recoVegetable = this.infoInter[4].recomendacion;
    } else if(value > 6) {
      this.interVegetable = this.infoInter[5].categoria;
      this.recoVegetable = this.infoInter[5].recomendacion;
    } 
  }

  onChangeInfoGrease(value) {
     if (value === 'Siempre'){
      this.interGrease = this.infoInter[6].categoria;
      this.recoGrease = this.infoInter[6].recomendacion;
    } else if (value === 'Con alguna frecuencia'){
      this.interGrease = this.infoInter[7].categoria;
      this.recoGrease = this.infoInter[7].recomendacion;
    } else {
      this.interGrease = this.infoInter[8].categoria;
      this.recoGrease = this.infoInter[8].recomendacion;
    }
  }

  onChangeInfoSal(value) {
     if (value === 'Siempre'){
      this.interSal = this.infoInter[9].categoria;
      this.recoSal= this.infoInter[9].recomendacion;
    } else if (value === 'Con alguna frecuencia'){
      this.interSal = this.infoInter[10].categoria;
      this.recoSal= this.infoInter[10].recomendacion;
    } else {
      this.interSal = this.infoInter[11].categoria;
      this.recoSal= this.infoInter[11].recomendacion;
    }
  }

  onChangeInfoSugar(value) {
    if (value === 'Siempre'){
      this.interSugar = this.infoInter[12].categoria;
      this.recoSugar= this.infoInter[12].recomendacion;
    } else if (value === 'Con alguna frecuencia'){
      this.interSugar = this.infoInter[13].categoria;
      this.recoSugar= this.infoInter[13].recomendacion;
    } else {
      this.interSugar = this.infoInter[14].categoria;
      this.recoSugar= this.infoInter[14].recomendacion;
    }
  }

  onChangeInfoFoods(value) {
    if (value === 'Siempre'){
      this.interFood = this.infoInter[15].categoria;
      this.recoFood = this.infoInter[15].recomendacion;
    } else if (value === 'Con alguna frecuencia'){
      this.interFood = this.infoInter[16].categoria;
      this.recoFood = this.infoInter[16].recomendacion;
    } else {
      this.interFood = this.infoInter[17].categoria;
      this.recoFood = this.infoInter[17].recomendacion;
    }
  }

  onChangeInfoWater(value) {
    if (value === 'Siempre'){
      this.interWater = this.infoInter[18].categoria;
      this.recoWater = this.infoInter[18].recomendacion;
    } else if (value === 'Con alguna frecuencia'){
      this.interWater = this.infoInter[19].categoria;
      this.recoWater = this.infoInter[19].recomendacion;
    } else {
      this.interWater = this.infoInter[20].categoria;
      this.recoWater = this.infoInter[20].recomendacion;
    }
  }

  increPuntaje() {
    let puntaje = 0;
    if(this.interFruits === this.infoInter[1].categoria) {
      puntaje += 3;
    } else if (this.interFruits === this.infoInter[2].categoria) {
      puntaje += 1.5;
    } 
    
    if (this.interVegetable === this.infoInter[4].categoria) {
      puntaje += 3;
    } else if (this.interVegetable === this.infoInter[5].categoria) {
      puntaje += 1.5;
    }

    if (this.interGrease === this.infoInter[6].categoria) {
      puntaje += 3;
    } else if (this.interGrease === this.infoInter[7].categoria) {
      puntaje += 1.5;
    }

    if (this.interSal === this.infoInter[9].categoria) {
      puntaje += 3;
    } else if (this.interSal === this.infoInter[10].categoria) {
      puntaje += 1.5;
    }

    if (this.interSugar === this.infoInter[12].categoria) {
      puntaje += 3;
    } else if (this.interSugar === this.infoInter[13].categoria) {
      puntaje += 1.5;
    }

    if (this.interFood === this.infoInter[15].categoria) {
      puntaje += 2;
    } else if (this.interFood === this.infoInter[16].categoria) {
      puntaje += 1;
    }

    if (this.interWater === this.infoInter[18].categoria) {
      puntaje += 3;
    } else if (this.interWater = this.infoInter[19].categoria) {
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
