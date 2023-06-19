import { Component, OnInit } from '@angular/core';
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
    private especialistaService: EspecialistaService){
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

  habilitarInhabilitarAcceso(usuario: Usuario) {
    // Habilitar o inhabilitar acceso del usuario
    // usuario.acceso = !usuario.acceso;
  }

  generarUsuario() {
    // Generar nuevo usuario
    // this.usuariosService.agregarUsuario(this.nuevoUsuario);
    this.nuevoUsuario = new Usuario(); // Limpiar formulario
  }
}
