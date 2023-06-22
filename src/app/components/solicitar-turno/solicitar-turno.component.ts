import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Especialidad } from 'src/app/models/especialidad';
import { Especialista } from 'src/app/models/especialista';
import { EspecialidadService } from 'src/app/services/especialidades.service';
import { EspecialistaService } from 'src/app/services/especialista.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent {

  currentPath: string[] = []
  currentPathDisplay!: string;
  selectedEspecialidad!: any;
  especialistas!: Especialista[];
  constructor(protected especialidadesService: EspecialidadService,
              protected especialistaService: EspecialistaService){
    // this.currentPath[0] ='Solicitud'
    // this.currentPath.forEach(x => {
    //   this.currentPathDisplay = x + '>'
    // })

  }


  onSelectEspecialidad(especialidadRecibida: string){
    this.selectedEspecialidad = especialidadRecibida;
    console.log('ASDAS', especialidadRecibida)
    this.especialidadesService.getByName(especialidadRecibida)
    .subscribe(x => {
      console.log("sss", x)
      this.especialistas = this.especialistaService.getByEspecialidad(x)
    })
  }



  calculateCurrentPath(){
    this.currentPath[0] ='Solicitud'
    this.currentPath.forEach(x => {
      this.currentPathDisplay = x + '>'
    })
    // this.currentPathDisplay = 

  }
}
