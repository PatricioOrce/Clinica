import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/app/models/paciente';
import { AuthService } from 'src/app/services/auth.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent {
  pacienteForm: FormGroup;
  paciente: Paciente = new Paciente();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private pacienteService: PacienteService,
  ) {
    this.pacienteForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      dni: ['', Validators.required],
      obraSocial: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  especialistaFormVisible: boolean = false;


  verifyEmail: boolean = false;

  selectedFile!: FileList;
  selectedFile2!: FileList;

  async registrarPaciente() {
    if(this.pacienteForm.valid){
      console.log('Registro de paciente:', this.paciente);
      this.authService
        .register(this.paciente.mail, this.paciente.password, 'paciente')
        .then((user) => {
          if(user){
            let arrayFiles = [];
            arrayFiles.push(this.selectedFile);
            arrayFiles.push(this.selectedFile2);
            this.pacienteService.uploadImagesAndCreate(this.paciente, arrayFiles, user.uid).then(() => {
              this.verifyEmail = true;
            })
            
          }
        })
        .catch((err ) => {
          console.log('Error al registrar', err);
        });
    }else{
      Object.keys(this.pacienteForm.controls).forEach((field) => {
        const control = this.pacienteForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
   
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  selectFile2(event: any): void {
    this.selectedFile2 = event.target.files[0];
    console.log(this.selectedFile2);
  }

  get nombre() {
    return this.pacienteForm.get('nombre');
  }
  
  get apellido() {
    return this.pacienteForm.get('apellido');
  }
  
  get edad() {
    return this.pacienteForm.get('edad');
  }
  
  get dni() {
    return this.pacienteForm.get('dni');
  }
  
  get obraSocial() {
    return this.pacienteForm.get('obraSocial');
  }
  
  get email() {
    return this.pacienteForm.get('email');
  }
  
  get password() {
    return this.pacienteForm.get('password');
  }
}

