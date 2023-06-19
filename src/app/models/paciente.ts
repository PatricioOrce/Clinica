import { Usuario } from "./usuario";

export class Paciente extends Usuario{
  obraSocial!: string;
  imagenPerfil2!: File;

  constructor() {
    super()
    this.perfil = "paciente"    
   }
 
}
