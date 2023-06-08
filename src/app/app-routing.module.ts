import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bienvenida',
    loadChildren: () =>
      import('./pages/bienvenida/bienvenida.module').then(
        (m) => m.BienvenidaModule
      ),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./pages/registro/registro.module').then((m) => m.RegistroModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
