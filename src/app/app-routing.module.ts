import { JornadaComponent } from './encuestador/jornada/jornada.component';
import { InfoJornadaComponent } from './coordinador/info-jornada/info-jornada.component';
import { InfoProgramaComponent } from './coordinador/info-programa/info-programa.component';
import { AssignedLinkComponent } from './assigned-link/assigned-link.component';
import { CoordinadorComponent } from './coordinador/coordinador.component';
import { NgModule } from '@angular/core';
//Directivas
import { RouterModule, Routes } from "@angular/router";

import { ConductasComponent } from './conductas/conductas.component';
import { SociodemograficosComponent } from './sociodemograficos/sociodemograficos.component';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { EspiritualidadComponent } from './espiritualidad/espiritualidad.component';
import { NutricionalComponent } from './nutricional/nutricional.component';
import { SuenoComponent } from './sueno/sueno.component';
import { JornadaActivaComponent } from './jornada/jornada.component';
import { EncuestadorComponent } from './encuestador/encuestador.component';
import { LoginComponent } from './login/login.component';
import { BioquimicasComponent } from './bioquimicas/bioquimicas.component';
import { FisiologicasComponent } from './fisiologicas/fisiologicas.component';
//Encabezado, Footer

import { AuthGuard } from './servicios/guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/salud', pathMatch: 'full' },
  { path: 'salud', component: AssignedLinkComponent, canActivate: [AuthGuard], children: [
        { path: 'jorActiva', component: JornadaActivaComponent, children: [
            { path: 'socio', component: SociodemograficosComponent },
            { path: 'fisio', component: FisiologicasComponent },
            { path: 'bio', component: BioquimicasComponent },
            { path: 'control', component: ConductasComponent },
            { path: 'ejercicio', component: EjercicioComponent },
            { path: 'nutricion', component: NutricionalComponent },
            { path: 'sueno', component: SuenoComponent },
            { path: 'espiritual', component: EspiritualidadComponent },
        ]},
        { path: 'infoPro', component: InfoProgramaComponent },
        { path: 'infoJor/:id', component: InfoJornadaComponent },
        { path: 'jrna', component: JornadaComponent },
    ]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
