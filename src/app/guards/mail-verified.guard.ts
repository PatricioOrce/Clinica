import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MailVerifiedGuard implements CanActivate {
  public usuario$: Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService, private router: Router,private toastr: ToastrService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.usuario$?.pipe(
      take(1),
      map((user) => {
        if (user && user.emailVerified) {
          return true;
        } else {
          this.router.navigate(['login']);
          this.toastr.warning('Verifica tu Mail para poder acceder!', 'Hey!');
          this.authSvc.logOut();
          return false;
        }
      })
    );
  }
}
