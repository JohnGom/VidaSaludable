import { AuthserviceService } from './../servicios/authservice.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coordinador',
  templateUrl: './coordinador.component.html',
  styleUrls: ['./coordinador.component.css']
})
export class CoordinadorComponent implements OnInit {

  indexSelected: number;
  idprogram: number;
  @Input() name: string;
  
  constructor(private service: AuthserviceService,
              public router: Router) { }

  ngOnInit() {
  }

  SignOff() {
    this.service.logout();
    this.router.navigate(['/login']);
  }

  selectTab(index: number, id: number): void {
  this.indexSelected = index;
  this.idprogram = id;
}

}
