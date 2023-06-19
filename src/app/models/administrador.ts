import { Usuario } from "./usuario"

export class Administrador extends Usuario{
    constructor() {
        super()
        this.perfil = "administrador"    
       }
     
}

