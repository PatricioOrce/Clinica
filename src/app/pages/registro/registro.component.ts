import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { EspecialidadService } from 'src/app/services/especialidades.service';
import { Especialista } from '../../models/especialista';
import { Paciente } from '../../models/paciente';
import { Especialidad } from '../../models/especialidad';
import Swal from 'sweetalert2';
import { PacienteService } from 'src/app/services/paciente.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario';
import { uploadBytes } from 'firebase/storage';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  constructor(
    private authService: AuthService,
    private especialistaService: EspecialistaService,
    private especialidadService: EspecialidadService,
    private pacienteService: PacienteService,
    private usuariosService: UsuariosService,
  ) {}

  // especialistaFormVisible: boolean = false;

  // paciente: Paciente = new Paciente;
  // especialista: Especialista = new Especialista();

  // especialidadSeleccionada: Especialidad = new Especialidad;
  // especialidades: Especialidad[] = [];

  verifyEmail: boolean = false;
  // mostrarFormPaciente = false;
  // mostrarFormEspecialista = false;

  // especialidadPersonalizada = '';

  // selectedFiles: any;

  // selectedFile!: FileList;
  // selectedFile2!: FileList;

  // ngOnInit() {
  //   this.especialidadService.getAll().subscribe(
  //     (especialidades: Especialidad[]) => {
  //       this.especialidades = especialidades;
  //     },
  //     (error) => {
  //       console.error('Error al obtener las especialidades', error);
  //     }
  //   );
  // }

  // async registrarPaciente() {
  //   console.log('Registro de paciente:', this.paciente);
  //   this.authService
  //     .register(this.paciente.mail, this.paciente.password, 'paciente')
  //     .then((user) => {
  //       if(user){
  //         let arrayFiles = [];
  //         arrayFiles.push(this.selectedFile);
  //         arrayFiles.push(this.selectedFile2);
  //         this.pacienteService.uploadImagesAndCreate(this.paciente, arrayFiles, user.uid).then(() => {
  //           this.verifyEmail = true;
  //         })
          
  //       }
  //     })
  //     .catch((err ) => {
  //       console.log('Error al registrar', err);
  //     });
  // }

  // async registrarEspecialista() {
  //   this.especialista.especialidades[0] = new Especialidad();
  //   this.especialista.especialidades[0].nombre = this.especialidadSeleccionada.nombre == 'otro' ? this.especialidadPersonalizada : this.especialidadSeleccionada.nombre;
  //   console.log('Registro de especialista:', this.especialista);
  //   this.authService
  //   //registro el usuario en firebase (Authentication)
  //     .register(this.especialista.mail, this.especialista.password, 'especialista')
  //     .then((user) => {
  //       if(user){
  //         //Si el usuario se registra con exito en firebase, lo intento dar de alta en la base de datos, (Firestore)
  //         this.especialidadService.getByName(this.especialidadPersonalizada)
  //         .subscribe((especialidadExistente) => {
  //           if(!especialidadExistente && this.especialidadSeleccionada.nombre != 'otro'){
  //             this.especialidadService.create(this.especialidadPersonalizada)
  //           }
  //         });
  //         //insertar al especialista (Firestore)
  //         this.especialistaService.uploadImageAndCreate(this.especialista, this.selectedFiles, user.uid)
  //         .then(() => {
  //           this.verifyEmail = true;
  //         })

  //       }
  //     })
  //     .catch(() => {
  //       console.log('Error al registrar');
  //     });
  // }

  // registrarUsuario(user: any, id: string){
  //   this.usuariosService.insert(user, id);
  // }

  // onImagenPerfilSeleccionada(event: any) {
  //   this.selectedFiles = event.target.files[0];
  //   console.log(this.selectedFiles);
  // }

  // selectFile(event: any): void {
  //   this.selectedFile = event.target.files[0];
  //   console.log(this.selectedFile);
  // }

  // selectFile2(event: any): void {
  //   this.selectedFile2 = event.target.files[0];
  //   console.log(this.selectedFile2);
  // }

  // onEspecialidadSeleccionada() {
  //   if (this.especialidadSeleccionada.nombre !== 'otro') {
  //     this.especialidadPersonalizada = '';
  //   }
  // }
}