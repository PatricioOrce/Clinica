import { Paciente } from "./paciente";
import { Especialista } from "./especialista";

export class Turno
{
  id!: string;
  estado!: string;
  paciente!: Paciente;
  especialista!: Especialista;
  fecha!: Date;
  reseña!: string;
  comentarioAdmin!: string;


}
