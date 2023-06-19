import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { StorageModule } from '@angular/fire/storage';
import { EspecialistaListaComponent } from './components/especialista-lista/especialista-lista.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

  ],
  providers: [    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
