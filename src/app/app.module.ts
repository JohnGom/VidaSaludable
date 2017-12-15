import { IntervencionesService } from './servicios/offline/intervencion/intervenciones.service';
import { JornadasService } from './servicios/offline/jornadas/jornada.service';
import { BaseService } from './servicios/offline/base/base.service';
import { TableDataSource } from './coordinador/reportes/table-data-source/table-data-source.component';
import { SendEmailComponent } from './intervencion/presentacion-final/sendemail/send-email.component';
import { mainReducer, peopleReducer } from './reducer/reducers';
import { ShareDataService } from './servicios/sharedata/share-data.service';
import { InterpretationService } from './servicios/interpretations/interpretation.service';
import { ListEncargadosComponent } from './coordinador/info-jornada/list-encargados/list-encargados.component';
import { BenefitedService } from './servicios/benefited/benefited.service';
import { UserService } from './servicios/users/user.service';
import { ServiceModalService } from './service-modal/service-modal.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { CdkTableModule } from '@angular/cdk/table';

import { AppComponent } from './app.component';
import { ConductasComponent } from './intervencion/conductas/conductas.component';
import { SociodemograficosComponent } from './intervencion/sociodemograficos/sociodemograficos.component';
import { EjercicioComponent } from './intervencion/ejercicio/ejercicio.component';
import { EspiritualidadComponent } from './intervencion/espiritualidad/espiritualidad.component';
import { NutricionalComponent } from './intervencion/nutricional/nutricional.component';
import { SuenoComponent } from './intervencion/sueno/sueno.component';
import { JornadaActivaComponent } from './jornada/jornada.component';
import { LoginComponent } from './login/login.component';
import { BioquimicasComponent } from './intervencion/bioquimicas/bioquimicas.component';
import { FisiologicasComponent } from './intervencion/fisiologicas/fisiologicas.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatCardModule, 
  MatButtonModule,
  MatTabsModule, 
  MatTableModule,
  MatDialogModule, 
  MatInputModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatListModule,
  MatSortModule,
  MatPaginatorModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatButtonToggleModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';

import { AuthserviceService } from './servicios/authservice.service';
import { ProgramService } from './servicios/programas/program.service';
import { JornadaService } from './servicios/jornadas/jornada.service';
import { AuthGuard } from './servicios/guard/auth.guard';
import { EncuestadorComponent } from './encuestador/encuestador.component';
import { ProgramaComponent } from './encuestador/programa/programa.component';
import { JornadaComponent } from './encuestador/jornada/jornada.component';
import { CoordinadorComponent } from './coordinador/coordinador.component';
import { InfoProgramaComponent } from './coordinador/info-programa/info-programa.component';
import { InfoJornadaComponent } from './coordinador/info-jornada/info-jornada.component';
import { AssignedLinkComponent } from './assigned-link/assigned-link.component';
import { NewProgramComponent } from './coordinador/info-programa/new-program/new-program.component';
import { UpdateProgramComponent } from './coordinador/info-programa/update-program/update-program.component';
import { NewJornadaComponent } from './coordinador/info-jornada/new-jornada/new-jornada.component';
import { UpdateJornadaComponent } from './coordinador/info-jornada/update-jornada/update-jornada.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { NewUserComponent } from './administrador/usuarios/new-user/new-user.component';
import { UpdateUserComponent } from './administrador/usuarios/update-user/update-user.component';
import { PresentacionFinalComponent } from './intervencion/presentacion-final/presentacion-final.component';
import { ReportesComponent } from './coordinador/reportes/reportes.component';

@NgModule({
  declarations: [
    AppComponent,
    ConductasComponent,
    SociodemograficosComponent,
    EjercicioComponent,
    EspiritualidadComponent,
    NutricionalComponent,
    SuenoComponent,
    JornadaComponent,
    JornadaActivaComponent,
    LoginComponent,
    BioquimicasComponent,
    FisiologicasComponent,
    EncuestadorComponent,
    ProgramaComponent,
    CoordinadorComponent,
    InfoProgramaComponent,
    InfoJornadaComponent,
    AssignedLinkComponent,
    NewProgramComponent,
    UpdateProgramComponent,
    NewJornadaComponent,
    SendEmailComponent,
    UpdateJornadaComponent,
    AdministradorComponent,
    UsuariosComponent,
    NewUserComponent,
    UpdateUserComponent,
    ListEncargadosComponent,
    PresentacionFinalComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    CdkTableModule,
    MatCardModule, 
    MatDialogModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatListModule,
    MatSortModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    ChartsModule,
    StoreModule.forRoot(mainReducer)
  ],
  providers: [
    AuthGuard,
    ProgramService,
    IntervencionesService,
    JornadaService,
    AuthserviceService,
    ServiceModalService,
    InterpretationService,
    ShareDataService,
    NewProgramComponent,
    UpdateProgramComponent,
    NewJornadaComponent,
    SendEmailComponent,
    UpdateJornadaComponent,
    NewUserComponent,
    UpdateUserComponent,
    UserService,
    BenefitedService,
    ListEncargadosComponent,
    BaseService,
    JornadasService
  ],
  entryComponents: [ 
    NewProgramComponent,
    SendEmailComponent,
    UpdateProgramComponent,
    NewJornadaComponent,
    UpdateJornadaComponent,
    NewUserComponent,
    UpdateUserComponent,
    ListEncargadosComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
