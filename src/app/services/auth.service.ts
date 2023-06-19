import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
// import { Usuario } from '../clases/usuario';
import Swal from 'sweetalert2';
import { StorageService } from './storage.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { sendEmailVerification } from '@angular/fire/auth';
import { EspecialistaService } from './especialista.service';
import { PacienteService } from './paciente.service';
import { UsuariosService } from './usuarios.service';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private afs: AngularFirestore,
    private especialistaService: EspecialistaService,
    private pacienteService: PacienteService,
    private usuariosService: UsuariosService,
    private adminService: AdminService
  ) {}

  public usuarioLogeado: any =
    this.getUsuarioLogueado() !== null ? this.getUsuarioLogueado() : false;
  public usuario: any;
  public ITEM_ACCESOS: any; // objeto con accesos utilizado en todo el sistema
  public msjError: string = '';

  isLoggedIn: boolean = this.getUsuarioLogueado() != null;
  //   usuario: Usuario | undefined = undefined;
  ngOnInit(): void {
    localStorage.clear();
  }

  updateLoginStatus(status: boolean): void {
    this.isLoggedIn = status;
  }
  public setearUsuarioLogeado(item: any) {
    localStorage.setItem('usuarioLogeado', JSON.stringify(item));
    this.usuarioLogeado = item;
  }
  public getUsuarioLogueado() {
    const returnvalue = JSON.parse(
      localStorage.getItem('usuarioLogeado') ?? ''
    );
    if (returnvalue == '') return null;
    return returnvalue;
  }
  public setearUsuarioYAccesos() {
    this.usuario = null;
    this.setearUsuarioLogeado(null);
  }

  async sendVerifcationEmail(
    user: any = this.afAuth.currentUser
  ): Promise<void> {
    try {
      const r = sendEmailVerification(await user);
      return r;
    } catch (error: any) {
      this.msjError = this.getError(error);
    }
  }

  async register(
    email: string,
    password: string,
    profile: string
  ): Promise<any> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      await this.sendVerifcationEmail(user);
      this.msjError = '';
      return user;
    } catch (error: any) {
      this.setearUsuarioYAccesos();
      this.msjError = this.getError(error.code);
    }
  }

  async login(email: string, password: string) {
    return await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.msjError = '';
        console.log("inicial", result)
        if (result.user) {
          if (result.user.emailVerified) {
            this.usuariosService.getByEmail(email).subscribe((x) => {
              console.log("primero", x)
              if (x?.perfil == 'especialista') {
                this.especialistaService
                  .getByEmail(email)
                  .subscribe((especialista) => {
                    this.setearUsuarioLogeado(especialista);
                  });
              } else if (x?.perfil == 'paciente') {
                this.pacienteService
                  .getByEmail(email)
                  .subscribe((paciente) => {
                    this.setearUsuarioLogeado(paciente);
                });
              } else if (x?.perfil == 'admin') {
                this.adminService
                  .getByEmail(email)
                  .subscribe((admin) => {
                    this.setearUsuarioLogeado(admin);
                   console.log("segundo", admin)

                });
              }

              this.updateLoginStatus(true);
              this.router.navigate(['/home']);
            });
          }
          //error verifica email
        }
      })
      .catch((error) => {
        this.setearUsuarioYAccesos();
        this.msjError = this.getError(error.code);
      });
  }

  logOut() {
    this.setearUsuarioYAccesos();
    this.updateLoginStatus(false);
    localStorage.removeItem('usuarioLogeado');
  }

  private getError(msj: string): string {
    switch (msj) {
      case 'auth/user-not-found':
        return 'No existe ningún registro de usuario que corresponda al correo electrónico indicado.';
      case 'auth/email-already-in-use':
        return 'Otro usuario ya está utilizando el correo electrónico indicado.';
      case 'auth/invalid-email':
        return 'El formato del correo electrónico no es correcto.';
      case 'auth/invalid-password':
        return 'El valor que se proporcionó para la contraseña no es válido. Debe contener al menos seis caracteres.';
      case 'auth/invalid-phone-number':
        return 'El valor que se proporcionó para el número de celular no es válido. Debe no estar vacío y que cumpla con el estándar E.164.';
      case 'auth/wrong-password':
        return 'La contraseña no es válida.';
      case 'auth/email-already-in-use':
        return 'La dirección de correo electrónico ya está en uso por otra cuenta.';
    }
    return 'Ocurrió un error.';
  }

  //   SignOut() {
  //     this.fireauth.signOut().then(
  //       () => {
  //         this.updateLoginStatus(false);
  //         this.router.navigate(['/login']);
  //       },
  //       (err) => {
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'error',
  //           title: err.message,
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //       }
  //     );
  //   }

  //   SetUserData(user: any, eventType: string, isAdmin = false) {
  //     const userData: Usuario = {
  //       uid: user.uid,
  //       email: user.email,
  //       displayName: user.displayName,
  //       isAdmin,
  //     };
  //     const currentdate = new Date();
  //     const datetime =
  //       currentdate.getDate() +
  //       '/' +
  //       (currentdate.getMonth() + 1) +
  //       '/' +
  //       currentdate.getFullYear() +
  //       ' @ ' +
  //       currentdate.getHours() +
  //       ':' +
  //       currentdate.getMinutes() +
  //       ':' +
  //       currentdate.getSeconds();

  //     localStorage.setItem('user', JSON.stringify(userData));
  //   }
}
