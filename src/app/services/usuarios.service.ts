import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from '../models/usuario';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private UsuariosCollection: AngularFirestoreCollection<Usuario>;

  constructor(private firestore: AngularFirestore) {
    this.UsuariosCollection = this.firestore.collection<Usuario>('usuarios');
  }

  // Métodos CRUD

  // Método para insertar un nuevo Usuario
  async insert(data: any, id: string){
    const docRef = this.UsuariosCollection.doc(id);
    console.log("llegaid a us:", data);

    var mappedUser = {
      id: id,
      nombre: data.nombre,
      apellido: data.apellido,
      mail: data.mail,
      dni: data.dni,
      perfil: data.perfil,
      edad: data.edad,
      password: '',
      imagenPerfil: ''
    }
    console.log("llegaid a us mapps:", mappedUser);

    return docRef.set({
      ...mappedUser
    });
  }

  // Método para obtener todos los Usuario
  get(): Observable<Usuario[]> {
    return this.UsuariosCollection.valueChanges().pipe(
      catchError(error => {
        console.error('Error al obtener los Usuario:', error);
        throw error;
      })
    );
  }

  getByEmail(mail: string): Observable<Usuario | undefined> {
    return this.UsuariosCollection.valueChanges().pipe(
      map(usuarios => {
        const usuario = usuarios.find(u => u.mail === mail);
        if (usuario) {
          return { ...usuario };
        } else {
          throw new Error(`No se encontró ningún Usuario con el correo electrónico ${mail}`);
        }
      }),
      catchError(error => {
        console.error('Error al obtener el Usuario por correo electrónico:', error);
        throw error;
      })
    );
  }

  getPerfilById(id: string): Observable<string | undefined> {
    return this.UsuariosCollection.doc<Usuario>(id).valueChanges().pipe(
      map(Usuario => {
        if (Usuario) {
          return Usuario.perfil; // Devuelve el valor del atributo "perfil" como string
        } else {
          throw new Error(`No se encontró ningún Usuario con el ID ${id}`);
        }
      }),
      catchError(error => {
        console.error('Error al obtener el Usuario por ID:', error);
        throw error;
      })
    );
  }
  
  // Método para actualizar un Usuario
  update(id: string, data: Partial<Usuario>): Promise<void> {
    return this.UsuariosCollection.doc<Usuario>(id).update(data)
      .catch(error => {
        console.error('Error al actualizar el Usuario:', error);
        throw error;
      });
  }
}
