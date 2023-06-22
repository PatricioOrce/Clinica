import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Especialidad } from '../models/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private especialidadesCollection: AngularFirestoreCollection<Especialidad>;
  private especialidades: Observable<Especialidad[]>;

  constructor(private afs: AngularFirestore) {
    this.especialidadesCollection = this.afs.collection<Especialidad>('especialidades');
    this.especialidades = this.especialidadesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Especialidad;
          const id = a.payload.doc.id;
          return { ...data, id };
        });
      })
    );
  }

  create(nombre: string, id: string): Promise<void> {
    var especialidad = new Especialidad;
    especialidad.id = id;
    especialidad.nombre = nombre;
    console.log("Creacion de Esepecialidad Service",especialidad, id)
    return this.especialidadesCollection.doc(id).set({...especialidad});
  }

  getAll(): Observable<Especialidad[]> {
    return this.especialidades;
  }

  getByName(nombre: string | undefined): Observable<any> {
    return this.especialidades.pipe(
      map(especialidades => especialidades.find(e => e.nombre === nombre))
    );
  }
}






