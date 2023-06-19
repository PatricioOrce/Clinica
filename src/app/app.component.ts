import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Clinica';
  /**
   *
   */
  constructor(protected authService: AuthService) {
    console.log(this.authService.usuarioLogeado)
  }
}
