import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Especialista } from 'src/app/models/especialista';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{
  constructor(private authService: AuthService,
    private usuariosService: UsuariosService,
    private especialistaService: EspecialistaService,
    private toastr: ToastrService){
      this.especialistaService.get().subscribe( x=>{
        this.especialistas = x;
        console.log(this.especialistas)
      })
    }

  especialistas: Especialista[] = [];


  nuevoUsuario: Usuario = new Usuario();


  ngOnInit() {
    // Obtener lista de usuarios
    // this.usuarios = this.usuariosService.getUsuarios();

  }

  habilitarInhabilitarAcceso(especialista: Especialista) {
    const nuevoEstado = !especialista.habilitado;
    const especialistaId = especialista.id;
  
    if (nuevoEstado) {
      this.especialistaService.habilitarCuenta(especialistaId)
        .then(() => {
          especialista.habilitado = nuevoEstado;
          const mensaje = nuevoEstado ? 'Especialista habilitado' : 'Especialista inhabilitado';
          this.toastr.success(mensaje);
        })
        .catch(error => {
          console.error('Error al habilitar la cuenta del especialista:', error);
          this.toastr.error('Error al habilitar la cuenta del especialista');
        });
    } else {
      this.especialistaService.deshabilitarCuenta(especialistaId)
        .then(() => {
          especialista.habilitado = nuevoEstado;
          const mensaje = nuevoEstado ? 'Especialista habilitado' : 'Especialista inhabilitado';
          this.toastr.success(mensaje);
        })
        .catch(error => {
          console.error('Error al deshabilitar la cuenta del especialista:', error);
          this.toastr.error('Error al deshabilitar la cuenta del especialista');
        });
    }
  }

  generarUsuario() {
    // Generar nuevo usuario
    // this.usuariosService.agregarUsuario(this.nuevoUsuario);
    this.nuevoUsuario = new Usuario(); // Limpiar formulario
  }
}
