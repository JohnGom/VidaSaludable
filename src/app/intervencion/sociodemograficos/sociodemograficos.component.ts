import { IntervencionesService } from './../../servicios/offline/intervencion/intervenciones.service';
import { INFO_INTERPRETATION } from './../../reducer/reducers';
import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { BenefitedService } from './../../servicios/benefited/benefited.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sociodemograficos',
  templateUrl: './sociodemograficos.component.html',
  styleUrls: ['./sociodemograficos.component.css']
})
export class SociodemograficosComponent implements OnInit {
  dataSource: object;
  public id: any;
	public typeId: string;
	public education: string;
	public firstname: string;
	public lastname: string;
	public birthdate: Date;
	public gender: string;
	public stratus: number;
	public civilStatus: string;
	public eps: string;
	public occupation: string;
	public religion: string;
  public jornada: any;

  public onlineOffline: boolean = navigator.onLine;

  generos = [{name: 'Masculino'}, {name: 'Femenino'}];
  estadosCiv = [{name: 'Soltero'}, {name: 'Unión Libre'}, {name: 'Casado'}, {name: 'Separado/divorciado'}, {name: 'Viudo'}];
  tiposAseg = [{name: 'No asegurado'},{name: 'Subsidiado'},{name: 'Contributivo'},{name: 'Regímenes especiales'}]
  ocupaciones = [{name: 'Oficios de hogar'},{name: 'Comerciante'},{name: 'Empleado'},{name: 'Jubilado'},{name: 'Estudiante'},{name: 'Otra'}]
  nivelesEst = [{name: 'Ninguna'},{name: 'Primaria'},{name: 'Bachiller'},{name: 'Técnica/ Tecnológica'},{name: 'Universitaria'},{name: 'Posgrado'}]
  religiones = [{name: 'Ninguna'},{name: 'Adventista 7º día'},{name: 'Católico'},{name: 'Testigo de Jehová'},{name: 'Evangélica'},{name: 'Otro'}]
  tiposid = [{name: 'Cedula', value:'CC'}, {name: 'Tarjeta de identidad', value:'TI'}];

  constructor(private service: BenefitedService,
              private service2: InterpretationService,
              private store:Store<any>,
              private router: Router,
              private _service: IntervencionesService) {
    this.store.select('people').subscribe((result) => {
      this.jornada = result.jornada;
    });
      }

  ngOnInit() {
  }

  infoClient(id: number) {
    localStorage.setItem('idparticipante', id.toString());
    this.service.getInfoClient(id).subscribe(
      data => {
        let info = data.json();
        this.id = info.id;
        this.typeId = info.typeId;
        this.education = info.education;
        this.firstname = info.firstname;
        this.lastname = info.lastname;
        this.birthdate = info.birthdate;  
        this.gender = info.gender;
        this.stratus = 2;  
        this.civilStatus = info.civilStatus;    
        this.eps = info.eps;    
        this.occupation = info.occupation;    
        this.religion = info.religion;    
    })
  }
  
  saveData(){
    let participante: any = new Object;
    participante.id = this.id;
    participante.typeId = this.typeId;
    participante.education = this.education;
    participante.firstname = this.firstname;
    participante.lastname = this.lastname;
    participante.birthdate = this.birthdate;
    participante.gender = this.gender;
    participante.stratus = 2;
    participante.civilStatus = this.civilStatus;
    participante.eps = this.eps;
    participante.occupation = this.occupation;
    participante.religion = this.religion;

    if(this.onlineOffline === true) {     
      this.service2.insertParticipante(participante).subscribe((result: any) => {
        console.log(result);
        let intervencion: any = new Object;
        intervencion.jornada = parseInt(this.jornada);
        intervencion.participante = parseInt(this.id);

        this.service2.insertIntervencion(intervencion).subscribe((result: any) => {
          let info: any = new Object;
            info.jornada = this.jornada;
            info.idpar = this.id;
            info.date = this.birthdate;
            info.gender = this.gender;
            info.inter = parseInt(result.text());
            info.name = this.firstname + ' ' + this.lastname;
            this.store.dispatch({ type: INFO_INTERPRETATION, payload: info});
        });
        this.router.navigate(['/salud/jorActiva/fisio']);
      });
    } else {
      this._service.addParticipante(participante).then(rowsAdded => {
        console.log(this.jornada);
        let intervencion: any = new Object;
        intervencion.jornada = parseInt(this.jornada);
        intervencion.participante = parseInt(this.id);
        intervencion.observacion = '';
        intervencion.resultado = '';
        intervencion.fechaInter = '';
        intervencion.fechaSegui = '';
        intervencion.correo = '';

        this._service.addIntervenciones(intervencion).then(rowsAdded => {
          let info: any = new Object;
            info.jornada = this.jornada;
            info.idpar = this.id;
            info.date = this.birthdate;
            info.gender = this.gender;
            info.inter = rowsAdded;
            info.name = this.firstname + ' ' + this.lastname;
            console.log(rowsAdded);
            this.store.dispatch({ type: INFO_INTERPRETATION, payload: info});
        }).catch(error => {
          console.error(error);
        });
        this.router.navigate(['/salud/jorActiva/fisio']);
      }).catch(error => {
        console.error(error);
      });
    }
  }
}
