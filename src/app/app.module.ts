import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RegistroPacienteComponent } from './components/registro-paciente/registro-paciente.component';
import { RegistroEspecialistaComponent } from './components/registro-especialista/registro-especialista.component';
import { RegistroAdministradorComponent } from './components/registro-administrador/registro-administrador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitarTurnoComponent } from './components/solicitar-turno/solicitar-turno.component';
import { TablaEspecialidadesComponent } from './components/tabla-especialidades/tabla-especialidades.component';

@NgModule({
  declarations: [
    AppComponent,
    SolicitarTurnoComponent,
    
    // RegistroPacienteComponent,
    // RegistroEspecialistaComponent,
    // RegistroAdministradorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
