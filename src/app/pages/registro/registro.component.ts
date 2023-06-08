import { Component } from '@angular/core';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Especialista } from '../../models/especialista';
import { Paciente } from '../../models/paciente';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  especialistaFormVisible: boolean = false;

  paciente = {
    nombre: '',
    apellido: '',
    edad: 0,
    dni: '',
    obraSocial: '',
    email: '',
    password: '',
    imagenPerfil: ''
  };

  especialista = {
    nombre: '',
    apellido: '',
    edad: 0,
    dni: '',
    especialidad: '',
    email: '',
    password: '',
    imagenPerfil: ''
  };

  toggleFormulario() {
    this.especialistaFormVisible = !this.especialistaFormVisible;
  }

  registrarPaciente() {
    // Lógica para registrar al paciente
    console.log('Registro de paciente:', this.paciente);
  }

  registrarEspecialista() {
    // Lógica para registrar al especialista
    console.log('Registro de especialista:', this.especialista);
  }

  onImagenPerfilSeleccionada(event: any) {
    // Lógica para manejar la selección de la imagen de perfil 
    const file = event.target.files[0];
    // Realizar las acciones necesarias con la imagen seleccionada
  }
}
