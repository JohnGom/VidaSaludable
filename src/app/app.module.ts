import { ServiceModalService } from './service-modal/service-modal.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { DatePickerModule } from 'ng2-datepicker';
import { CdkTableModule } from '@angular/cdk/table';

import { AppComponent } from './app.component';
import { ConductasComponent } from './conductas/conductas.component';
import { SociodemograficosComponent } from './sociodemograficos/sociodemograficos.component';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { EspiritualidadComponent } from './espiritualidad/espiritualidad.component';
import { NutricionalComponent } from './nutricional/nutricional.component';
import { SuenoComponent } from './sueno/sueno.component';
import { JornadaActivaComponent } from './jornada/jornada.component';
import { LoginComponent } from './login/login.component';
import { BioquimicasComponent } from './bioquimicas/bioquimicas.component';
import { FisiologicasComponent } from './fisiologicas/fisiologicas.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MdDatepickerModule, 
  MdCardModule, 
  MdButtonModule, 
  MdTabsModule, 
  MdTableModule,
  MdDialogModule, 
  MdInputModule, 
  MdButtonToggleModule } from '@angular/material';

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
ServiceModalService

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
    UpdateJornadaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DatePickerModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MdDatepickerModule,
    MdButtonModule,
    MdCardModule,
    MdTabsModule,
    MdTableModule,
    CdkTableModule,
    MdCardModule, 
    MdDialogModule, 
    MdInputModule, 
    MdButtonToggleModule
  ],
  providers: [
    AuthGuard,
    ProgramService,
    JornadaService,
    AuthserviceService,
    ServiceModalService,
    NewProgramComponent,
    UpdateProgramComponent,
    NewJornadaComponent,
    UpdateJornadaComponent
  ],
  entryComponents: [ 
    NewProgramComponent,
    UpdateProgramComponent,
    NewJornadaComponent,
    UpdateJornadaComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
