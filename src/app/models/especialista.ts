import { Especialidad } from "./especialidad";
import { Usuario } from "./usuario";

export class Especialista extends Usuario{
  especialidades: Especialidad[] = [];
  habilitado: boolean = false;

  constructor() {
   super()
   this.perfil = "especialista"    
  }

}
