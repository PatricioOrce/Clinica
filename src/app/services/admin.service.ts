import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Administrador } from '../models/administrador';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private AdministradorsCollection: AngularFirestoreCollection<Administrador>;

  constructor(private firestore: AngularFirestore) {
    this.AdministradorsCollection = this.firestore.collection<Administrador>('Administradors');
  }

  // Métodos CRUD

  // Método para insertar un nuevo Administrador
  async insert(data: any, id: string | undefined){
    const docRef = this.AdministradorsCollection.doc(id);
    data.id = id;
    data.especialidades = {...data.especialidades[0]}
    return docRef.set({
      ...data
    });
  }

  // Método para obtener todos los Administradors
  get(): Observable<Administrador[]> {
    return this.AdministradorsCollection.valueChanges().pipe(
      catchError(error => {
        console.error('Error al obtener los Administradors:', error);
        throw error;
      })
    );
  }

  getById(id: string): Observable<Administrador | undefined> {
    return this.AdministradorsCollection.doc<Administrador>(id).valueChanges().pipe(
      map(Administrador => {
        if (Administrador) {
          return { ...Administrador, id };
        } else {
          throw new Error(`No se encontró ningún Administrador con el ID ${id}`);
        }
      }),
      catchError(error => {
        console.error('Error al obtener el Administrador por ID:', error);
        throw error;
      })
    );
  }
  
  getByEmail(mail: string): Observable<Administrador | undefined> {
    return this.AdministradorsCollection.valueChanges().pipe(
      map(Administrador => {
        const usuario = Administrador.find(u => u.mail === mail);
        if (usuario) {
          return { ...usuario };
        } else {
          throw new Error(`No se encontró ningún Administrador con el correo electrónico ${mail}`);
        }
      }),
      catchError(error => {
        console.error('Error al obtener el Administrador por correo electrónico:', error);
        throw error;
      })
    );
  }
  // Método para actualizar un Administrador
  update(id: string, data: Partial<Administrador>): Promise<void> {
    return this.AdministradorsCollection.doc<Administrador>(id).update(data)
      .catch(error => {
        console.error('Error al actualizar el Administrador:', error);
        throw error;
      });
  }
}
