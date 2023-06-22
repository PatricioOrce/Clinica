import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogedInGuard implements CanActivate {
  public usuario$: Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authSvc.isLoggedIn)
      return true
    return false;
    
    // this.usuario$?.pipe(
    //   take(1),
    //   map((user) => {
    //     if (user) {
    //       this.router.navigate(['login']);
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   })
    // );
  }
  
}
