import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/models/especialidad';
import { Especialista } from 'src/app/models/especialista';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadService } from 'src/app/services/especialidades.service';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.css']
})
export class RegistroEspecialistaComponent {
  constructor(
    private authService: AuthService,
    private especialistaService: EspecialistaService,
    private especialidadService: EspecialidadService,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.especialistaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      especialidadPersonalizada: ['']
    });
    this.especialista = new Especialista();

  }
  especialistaForm!: FormGroup;
  especialista: Especialista;

  especialidadSeleccionada: Especialidad = new Especialidad;
  especialidades: Especialidad[] = [];
  especialidadesSeleccionadas!: Especialidad[];
  verifyEmail: boolean = false;

  especialidadPersonalizada = '';
  selectedFiles: any;

  ngOnInit() {
    this.especialidadService.getAll().subscribe(
      (especialidades: Especialidad[]) => {
        this.especialidades = especialidades;
      },
      (error) => {
        console.error('Error al obtener las especialidades', error);
      }
    );
  
   
  }
  async registrarEspecialista() {
    if(this.especialistaForm.valid){
      // this.especialista.especialidades = [];
      const id = this.afs.createId();
      // this.especialista.especialidades[0].id = id;
      console.log('Registro de especialista:', this.especialista, "asdasd", this.especialidadPersonalizada, this.especialidadSeleccionada.nombre);
      this.authService
      //registro el usuario en firebase (Authentication)
        .register(this.especialista.mail, this.especialista.password, 'especialista')
        .then((user) => {
          if(user){
            //Checkeo para saber si ya existe la especialidad en la bd
            this.especialidadService.getByName(this.especialidadPersonalizada)
            .subscribe((especialidadExistente) => {
              if(!especialidadExistente){
                this.especialista.especialidades.push( {id: id, nombre: this.especialidadPersonalizada, imageUrl: ''})
                this.especialista.especialidades.push(new Especialidad)
                this.especialidadService.create(this.especialidadPersonalizada,id)
              }
            });
            //insertar al especialista (Firestore)
            this.especialistaService.uploadImageAndCreate(this.especialista, this.selectedFiles, user.uid)
            .then(() => {
              this.verifyEmail = true;
              this.router.navigate(['home'])
            })
  
          }
        })
        .catch(() => {
          console.log('Error al registrar');
        });
    }else{
      Object.keys(this.especialistaForm.controls).forEach((field) => {
        const control = this.especialistaForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
    
  }
 

  onImagenPerfilSeleccionada(event: any) {
    this.selectedFiles = event.target.files[0];
    console.log(this.selectedFiles);
  }

  onEspecialidadSeleccionada(event: any) {
    this.especialidadSeleccionada.nombre = event.target.value;
    console.log(this.especialidadSeleccionada.nombre)
  }

  onEspecialidadesSeleccionadas(seleccionadas: Especialidad[]) {
    this.especialidadesSeleccionadas = seleccionadas;
  }


  get nombre() {
    return this.especialistaForm.get('nombre');
  }
  
  get apellido() {
    return this.especialistaForm.get('apellido');
  }
  
  get edad() {
    return this.especialistaForm.get('edad');
  }
  
  get dni() {
    return this.especialistaForm.get('dni');
  }
  
  get obraSocial() {
    return this.especialistaForm.get('obraSocial');
  }
  
  get email() {
    return this.especialistaForm.get('email');
  }
  
  get password() {
    return this.especialistaForm.get('password');
  }
}
