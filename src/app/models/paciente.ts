export interface Paciente {
  nombre: string;
  apellido: string;
  edad: number;
  dni: string;
  obraSocial: string;
  mail: string;
  password: string;
  imagenPerfil1: File | undefined;
  imagenPerfil2: File | undefined;
}
