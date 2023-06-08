// import { Injectable, OnInit } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { Router } from '@angular/router';
// import { Usuario } from '../clases/usuario';
// import Swal from 'sweetalert2';
// import { StorageService } from './storage.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService implements OnInit {
//   // [x: string]: any;

//   constructor(private fireauth: AngularFireAuth, 
//               private router: Router,
//               private storage: StorageService) {}

//   isLoggedIn: boolean =false;
//   usuario: Usuario | undefined = undefined;
//   ngOnInit(): void {}
  
  
//   updateLoginStatus(status: boolean): void {
//     this.isLoggedIn = status;
//   }
//   get getUser(): Usuario | undefined {
//       return this.usuario
//   }
//   SignIn(receivedEmail: string, password: string) {

//     //Se realiza el Login
//     this.fireauth.signInWithEmailAndPassword(receivedEmail, password).then(
//       async (res) => {
//         this.updateLoginStatus(true);
//         const result = await this.storage.getById('usuarios', res.user?.uid);
//         this.usuario = result;
//         console.log(this.usuario);
//         Swal.fire({
//           position: 'center',
//           icon: 'success',
//           title: 'Logged In Succesfully',
//         })
//         this.router.navigate(['/home']);
//       },
//       (err) => {
//         Swal.fire({
//           position: 'center',
//           icon: 'error',
//           title: err.message,
//           showConfirmButton: false,
//           timer: 1500
//         })
//         this.router.navigate(['/login']);
//       }
//     );

//   }

//   SignUp(receivedEmail: string, password: string) {
//     return this.fireauth.createUserWithEmailAndPassword(receivedEmail, password).then(
//       (res) => {
//         // this.storage.saveDoc({uid: res.user?.uid, email: receivedEmail, isAdmin: false}, "usuarios", res.user?.uid)
//         // .catch(x => console.log("Error", x));
//         Swal.fire({
//           position: 'center',
//           icon: 'success',
//           title: 'Registration Successful',
//           showConfirmButton: false,
//           timer: 1500
//         })
//         // this['sendEmailForVarification'](res.user);
//         this.SignIn(receivedEmail,password);
//         // this.router.navigate(['/login']);
//       }
//     );
//   }

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
//           timer: 1500
//         })
//       }
//     );
//   }

//   SetUserData(user: any, eventType: string, isAdmin =false) {
//     const userData: Usuario = {
//       uid: user.uid,
//       email: user.email,
//       displayName: user.displayName,
//       isAdmin
//     }
//     const currentdate = new Date();
//     const datetime = currentdate.getDate() + "/"
//       + (currentdate.getMonth() + 1) + "/"
//       + currentdate.getFullYear() + " @ "
//       + currentdate.getHours() + ":"
//       + currentdate.getMinutes() + ":"
//       + currentdate.getSeconds();

//     localStorage.setItem('user', JSON.stringify(userData));
//   }
// }
