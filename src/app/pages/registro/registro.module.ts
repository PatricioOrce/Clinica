import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from 'src/app/components/verify-email/verify-email.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { StorageModule } from '@angular/fire/storage';


@NgModule({
  declarations: [
    RegistroComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,


  ],
  providers: [    StorageModule],

})
export class RegistroModule { }
