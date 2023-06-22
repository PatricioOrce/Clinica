import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Especialidad } from 'src/app/models/especialidad';

@Component({
  selector: 'app-tabla-especialidades',
  templateUrl: './tabla-especialidades.component.html',
  styleUrls: ['./tabla-especialidades.component.css']
})
export class TablaEspecialidadesComponent {
  @Input() especialidades: Especialidad[] = [];
  @Input() seleccionadas: Especialidad[] = [];
  @Output() especialidadesSeleccionadas = new EventEmitter<Especialidad[]>();

  toggleSeleccionEspecialidad(especialidad: Especialidad) {
    if (this.estaSeleccionada(especialidad)) {
      this.deseleccionarEspecialidad(especialidad);
    } else {
      this.seleccionarEspecialidad(especialidad);
    }
    this.actualizarSeleccionadas();
  }

  estaSeleccionada(especialidad: Especialidad): boolean {
    return this.seleccionadas.some(seleccionada => seleccionada.id === especialidad.id);
  }

  private seleccionarEspecialidad(especialidad: Especialidad) {
    this.seleccionadas.push(especialidad);
  }

  private deseleccionarEspecialidad(especialidad: Especialidad) {
    const index = this.seleccionadas.findIndex(seleccionada => seleccionada.id === especialidad.id);
    if (index !== -1) {
      this.seleccionadas.splice(index, 1);
    }
  }

  private actualizarSeleccionadas() {
    this.especialidadesSeleccionadas.emit(this.seleccionadas);
  }
}