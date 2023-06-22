import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from 'src/app/components/verify-email/verify-email.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { StorageModule } from '@angular/fire/storage';
import { RegistroEspecialistaComponent } from 'src/app/components/registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from 'src/app/components/registro-paciente/registro-paciente.component';
import { TablaEspecialidadesComponent } from 'src/app/components/tabla-especialidades/tabla-especialidades.component';


@NgModule({
  declarations: [
    RegistroComponent,
    VerifyEmailComponent,
    RegistroEspecialistaComponent,
    RegistroPacienteComponent,
    TablaEspecialidadesComponent //aca taba la chichara
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,


  ],
  providers: [],

})
export class RegistroModule { }
