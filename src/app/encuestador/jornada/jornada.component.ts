import { IntervencionesService } from './../../servicios/offline/intervencion/intervenciones.service';
import { JornadasService } from './../../servicios/offline/jornadas/jornada.service';
import { InterpretationService } from './../../servicios/interpretations/interpretation.service';
import { INFO_INTERPRETATION, ESTADO_BIOQUIMICA } from './../../reducer/reducers';
import { ShareDataService } from './../../servicios/sharedata/share-data.service';
import { User } from './../../data/user';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { JornadaService } from '../../servicios/jornadas/jornada.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html',
  styleUrls: ['./jornada.component.css']
})
export class JornadaComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('currentUser')) || [];
  dataSource: any = [];
  questions: any = [];
  infoInter: any = [];
  loading = false;

  public onlineOffline: boolean = navigator.onLine;

  constructor(private service: JornadaService,
              private store:Store<any>,
              private service2: InterpretationService,
              private shareservice: ShareDataService,
              private _service: JornadasService,
              private _service2: IntervencionesService) {

  if(this.onlineOffline === true) {           
    if(this.user.token !== undefined) {
      this.service.getJornadas(this.user.token).subscribe(
        data => {
        this.dataSource = data.json();
      });
    }
  } else {
    if(this.user.token !== undefined) {
      this._service.getJornadas().
      then(jornadas => {
        this.dataSource = jornadas;
      }).catch(error => {
        console.error(error);
      });
    }
  }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.id.currentValue !== undefined) {
    this.service.getJornadas(changes.id.currentValue).subscribe(
      data => {
      this.dataSource = data.json();
    })
    }
  }

  ngOnInit() {
    this.service2.getAllQuestions().subscribe(
        data => {
        this.questions = data.json();
      });

    this.service2.getAllInfoInterp().subscribe(
        data => {
        this.infoInter = data.json();
      });
  }

  send(infojor: any) {
    let info: any = new Object;
    info.jornada = infojor.id;
    let bio = infojor.bioquimica;
    this.store.dispatch({ type: INFO_INTERPRETATION, payload: info});
    this.store.dispatch({ type: ESTADO_BIOQUIMICA, payload: bio});
  }

  upInfo() {
    this.loading = true;
    this._service2.getParticipante().
    then(data => {
      let participantes: any = data;
        if (participantes.length > 0) {
          for(let i=0; i<participantes.length; i++) {
            this.service2.insertParticipante(participantes[i]).subscribe();
          }
          this._service2.deleteParticipante().
          then(rowsDeleted => {
            this.syncIntervencion();
          }).catch(error => {
            console.error(error);
          });
        }
      }).catch(error => {
        console.error(error);
      });
  }

  dowloandInfo() {
    this.loading = true;
    this._service.getJornadas().
    then(data => {
      let jornada: any = data;
        if (jornada.length > 0) {
          this._service.deleteJornada().
          then(rowsDeleted => {
            for(let i=0; i<this.dataSource.length; i++){
              this._service.addJornadas(this.dataSource[i]).
                then();
            }
          }).catch(error => {
            console.error(error);
          });
        } else {
          for(let i=0; i<this.dataSource.length; i++){
            this._service.addJornadas(this.dataSource[i]).
              then(rowsAdded => {
              }).catch(error => {
                console.error(error);
              });
          }
        }
      }).catch(error => {
        console.error(error);
      });
    
    this._service.getPreguntas().
    then(data => {
      let question: any = data;
        if (question.length > 0) {
          this._service.deletePreguntas().
          then(rowsDeleted => {
            for(let i=0; i<this.questions.length; i++){
              this._service.addPreguntas(this.questions[i]).
                then();
            }
          }).catch(error => {
            console.error(error);
          });
        } else {
          for(let i=0; i<this.questions.length; i++){
            this._service.addPreguntas(this.questions[i]).
              then();
          }
        }
      }).catch(error => {
        console.error(error);
      });

      this._service.getinfoInterpretaciones().
      then(data => {
        let infoInter: any = data;
          if (infoInter.length > 0) {
            this._service.deleteinfoInterpretaciones().
            then(rowsDeleted => {
              for(let i=0; i<this.infoInter.length; i++){
                this._service.addinfoInterpretaciones(this.infoInter[i]).
                  then();
              }
            }).catch(error => {
              console.error(error);
            });
          } else {
            for(let i=0; i<this.infoInter.length; i++){
              this._service.addinfoInterpretaciones(this.infoInter[i]).
                then();
            }
          }
          this.loading = false;  
        }).catch(error => {
          console.error(error);
        });
              
  }

  syncIntervencion() {
    this._service2.getIntervenciones().
    then(data => {
      let interven: any = data;
        if (interven.length > 0) {
          for(let i=0; i<interven.length; i++) {
            this.service2.insertIntervencion(interven[i]).subscribe((result: any) => {
              this.syncInfoInterven(parseInt(result.text()));
            });
          }
          this._service2.deleteIntervenciones().
          then(data => {
            this.loading = false;
          }).catch(error => {
            console.error(error);
          });
        }
      }).catch(error => {
        console.error(error);
      });
  }

  syncInfoInterven(id: number) {
    this._service2.getDetalleInter().
    then(data => {
      let detalle: any = data;
        if (detalle.length > 0) {
            this.service2.detalleInterven(detalle).subscribe();
          this._service2.deleteDetalleInter().
          then().catch(error => {
            console.error(error);
          });
        }
      }).catch(error => {
        console.error(error);
      });

    this._service2.getInterpretacion().
    then(data => {
      let interp: any = data;
        if (interp.length > 0) {
          for(let i=0; i<interp.length; i++) {
            interp[i].intervencion = id;
            let capa = [];
            capa.push(interp[i])
            this.service2.insertInterpretacion(capa).subscribe();
          }
          this._service2.deleteInterpretacion().
          then().catch(error => {
            console.error(error);
          });
        }
      }).catch(error => {
        console.error(error);
      });
  }

}
