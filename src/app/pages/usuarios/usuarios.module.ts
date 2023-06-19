import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { FormsModule } from '@angular/forms';
import { EspecialistaListaComponent } from 'src/app/components/especialista-lista/especialista-lista.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    EspecialistaListaComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,

  ]
})
export class UsuariosModule { }
