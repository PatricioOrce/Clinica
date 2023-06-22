import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  verifyEmail: boolean = false;

  constructor(private authService: AuthService) { }

  login() {
    // Aquí puedes implementar la lógica de inicio de sesión
    console.log('Email:', this.email);
    console.log('Contraseña:', this.password);
    this.authService.login(this.email, this.password);
  }

  accesoRapido() {
    this.password = "test@test.com";
    this.email = "test@test.com";
  }
  accesoRapidoAdmin(){
    this.password = "123456789"
    this.email = "patricioorce2001@gmail.com"
  }
  accesoRapidoEspecialista1(){
    
    this.password = "123456789"
    this.email = "parturotru@gufum.com"
  }
  accesoRapidoEspecialista2(){
    this.password = "1234567"
    this.email = "joknuzofya@gufum.com"
  }
  accesoRapidoPaciente1(){
    this.password = "123456789"
    this.email = "ladrunofyu@gufum.com"
  }
  accesoRapidoPaciente2(){
    this.password = "123456789"
    this.email = "dafyugortu@gufum.com"
  }
  accesoRapidoPaciente3(){
    this.password = "123456789"
    this.email = "lorkiharza@gufum.com"
  }
}