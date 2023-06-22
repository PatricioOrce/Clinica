import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Especialista } from '../models/especialista';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { UsuariosService } from './usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { Especialidad } from '../models/especialidad';
import { EspecialidadService } from './especialidades.service';

@Injectable({
  providedIn: 'root',
})
export class EspecialistaService {
  private especialistasCollection: AngularFirestoreCollection<Especialista>;
  public dbPath: string = 'especialistas';

  constructor(
    private firestore: AngularFirestore,
    private usuarioService: UsuariosService,
    private toastr: ToastrService,
    private especialidadService: EspecialidadService
  ) {
    this.especialistasCollection = this.firestore.collection<Especialista>(
      this.dbPath
    );
  }

  // Métodos CRUD

  // Método para insertar un nuevo especialista
  async insert(data: any, id: string | undefined) {
    const docRef = this.especialistasCollection.doc(id);
    data.id = id;
    data.especialidades = { ...data.especialidades[0] };
    console.log('especialisttt', data);
    return docRef.set({
      ...data,
    });
  }

  // Método para obtener todos los especialistas
  get(): Observable<Especialista[]> {
    return this.especialistasCollection.valueChanges().pipe(
      catchError((error) => {
        console.error('Error al obtener los especialistas:', error);
        throw error;
      })
    );
  }

  getById(id: string): Observable<Especialista | undefined> {
    return this.especialistasCollection
      .doc<Especialista>(id)
      .valueChanges()
      .pipe(
        map((especialista) => {
          if (especialista) {
            return { ...especialista, id };
          } else {
            throw new Error(
              `No se encontró ningún especialista con el ID ${id}`
            );
          }
        }),
        catchError((error) => {
          console.error('Error al obtener el especialista por ID:', error);
          throw error;
        })
      );
  }

  getByEmail(mail: string): Observable<Especialista | undefined> {
    return this.especialistasCollection.valueChanges().pipe(
      map((especialista) => {
        const usuario = especialista.find((u) => u.mail === mail);
        if (usuario) {
          return { ...usuario };
        } else {
          throw new Error(
            `No se encontró ningún Especialista con el correo electrónico ${mail}`
          );
        }
      }),
      catchError((error) => {
        console.error(
          'Error al obtener el Especialista por correo electrónico:',
          error
        );
        throw error;
      })
    );
  }
  // Método para actualizar un especialista
  update(id: string, data: Partial<Especialista>): Promise<void> {
    return this.especialistasCollection
      .doc<Especialista>(id)
      .update(data)
      .catch((error) => {
        console.error('Error al actualizar el especialista:', error);
        throw error;
      });
  }
  public habilitarCuenta(uid: string) {
    return this.firestore
      .collection(this.dbPath)
      .doc(uid)
      .update({ habilitado: true });
  }

  public deshabilitarCuenta(uid: string) {
    return this.firestore
      .collection(this.dbPath)
      .doc(uid)
      .update({ habilitado: false });
  }
  public uploadImageAndCreate(item: any, file: any, id: any): any {

    const storage = getStorage();

    let pathImg = this.dbPath + new Date().getTime() + '.png';
    const imgRef = ref(storage, pathImg);

    const upload = uploadBytes(imgRef, file)
      .then((e) => {
        getDownloadURL(e['ref'])
          .then(async (url: string) => {
            item.imagenPerfil = url;
            await this.usuarioService.insert(item, id).then(() => {
              return this.insert(item, id).then(() => {
                this.toastr.success(
                  'Especialista creado con exito!',
                  `Bienvenido ${item.mail}`
                );
              });
            });
          })
          .catch((err) => console.error('getDownloadURL: ', err));
      })
      .catch((err) => console.error(err));
    return upload;
  }

  getByEspecialidad(especialidad: Especialidad): Especialista[] {
    var especialistasFiltrados: Especialista[] = [];
    this.especialistasCollection.valueChanges().subscribe((especialistas) => {
      especialistas.forEach((especialista) => {
        const especialidadesEspecialista = especialista.especialidades;
        const especialidadEncontrada = especialidadesEspecialista.find(
          (e) => e.id === especialidad.id
        );
        if (especialidadEncontrada) {
          especialistasFiltrados.push(especialista);
        }
      });
    });
    return especialistasFiltrados;
  }
  // .pipe(
  //   map((especialistas: Especialista[]) => {
  //     console.log("entire", especialistas)
  //     // Filtrar los especialistas por la especialidad
  //     return especialistas.filter((especialista: Especialista) => {
  //     console.log("filtred", especialista)

  //       if (Array.isArray(especialista.especialidades)) {
  //         // Verificar si el array de especialidades contiene la especialidad buscada
  //         return especialista.especialidades.includes(especialidad);
  //       } else {
  //         console.log("Imhir")
  //         return false; // Si no es un array, no incluir el especialista
  //       }
  //     });
  //   }),
  //   catchError((error: any) => {
  //     console.error('Error al obtener los especialistas por especialidad', error);
  //     return throwError(error);
  //   })
  // );
}
