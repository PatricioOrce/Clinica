import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaHabilitadaGuard } from './guards/cuenta-habilitada.guard';
import { LogedInGuard } from './guards/loged-in.guard';

const routes: Routes = [
  {
    
    path: '',
    loadChildren: () =>
      import('./pages/bienvenida/bienvenida.module').then(
        (m) => m.BienvenidaModule
      ),

  },
  {
    
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then(
        (m) => m.HomeModule
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

    canActivate: [LogedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
