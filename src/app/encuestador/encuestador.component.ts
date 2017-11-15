import { InterpretationService } from './../servicios/interpretations/interpretation.service';
import { AuthserviceService } from './../servicios/authservice.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-encuestador',
  templateUrl: './encuestador.component.html',
  styleUrls: ['./encuestador.component.css']
})
export class EncuestadorComponent implements OnInit {
  indexSelected: number;
  idprogram: number;
  validar: boolean;
  slideIndex;
  slideWrap;
  slideInterval;
  slidePause;
  slideNoTransition;
  extraSlides;
  constructor(private service: AuthserviceService,
              public router: Router,
              public route: ActivatedRoute) { 
    if(this.router.routerState.snapshot.url='/salud'){
      this.validar === true;
    } else {
      this.validar === false;
    }
    this.slideIndex = 1;
    this.slideWrap = true;
    this.slideInterval = 5000;
    this.slidePause = "hover";
    this.slideNoTransition = false;
    this.extraSlides = false;
  }

  ngOnInit() {
    console.log(this.router.url);
    console.log(this.route);
    
  }

  SignOff() {
    this.service.logout();
  }

  selectTab(index: number, id: number): void {
    this.indexSelected = index;
    this.idprogram = id;
  }

}
