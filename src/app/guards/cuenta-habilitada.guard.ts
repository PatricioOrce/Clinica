import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CuentaHabilitadaGuard implements CanActivate {
  constructor(public authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      console.log(this.authService.usuarioLogeado)
    return (
      this.authService.usuarioLogeado.perfil == 'especialista' &&
      this.authService.usuarioLogeado.habilitado
    );
  }
}