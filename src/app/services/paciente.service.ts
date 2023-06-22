import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Paciente } from '../models/paciente';
import { Observable, catchError, map } from 'rxjs';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { UsuariosService } from './usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private pacientesCollection: AngularFirestoreCollection<Paciente>;
  public dbPath: string = 'pacientes';
  constructor(private firestore: AngularFirestore, private usuariosService: UsuariosService, private toastr: ToastrService) {
    this.pacientesCollection = this.firestore.collection<Paciente>(this.dbPath);
  }

  // Métodos CRUD

  // Método para insertar un nuevo paciente
  async insert(data: any, id: string | undefined){
    const docRef = this.pacientesCollection.doc(id);
    data.id = id;
    return docRef.set({
      ...data
    });
  }

  // Método para obtener todos los paciente
  get(): Observable<Paciente[]> {
    return this.pacientesCollection.valueChanges().pipe(
      catchError(error => {
        console.error('Error al obtener los paciente:', error);
        throw error;
      })
    );
  }

  getById(id: string): Observable<Paciente | undefined> {
    return this.pacientesCollection.doc<Paciente>(id).valueChanges().pipe(
      map(paciente => {
        if (paciente) {
          return { ...paciente, id };
        } else {
          throw new Error(`No se encontró ningún paciente con el ID ${id}`);
        }
      }),
      catchError(error => {
        console.error('Error al obtener el paciente por ID:', error);
        throw error;
      })
    );
  }
  getByEmail(mail: string): Observable<Paciente | undefined> {
    return this.pacientesCollection.valueChanges().pipe(
      map(paciente => {
        const usuario = paciente.find(u => u.mail === mail);
        if (usuario) {
          return { ...usuario };
        } else {
          throw new Error(`No se encontró ningún Especialista con el correo electrónico ${mail}`);
        }
      }),
      catchError(error => {
        console.error('Error al obtener el Especialista por correo electrónico:', error);
        throw error;
      })
    );
  }
  // Método para actualizar un paciente
  update(id: string, data: Partial<Paciente>): Promise<void> {
    return this.pacientesCollection.doc<Paciente>(id).update(data)
      .catch(error => {
        console.error('Error al actualizar el paciente:', error);
        throw error;
      });
  }
  public uploadImagesAndCreate(item: any, files: any[], id: any): any {
    console.log(item);
    console.log(files);
    const storage = getStorage();

    item.urlFotos = [];
    let i = 0;
    files.forEach((file: any) => {
      let pathImg = this.dbPath + new Date().getTime() + '.png';
      const imgRef = ref(storage, pathImg);
      console.log(file);
      console.log(pathImg);
      console.log(imgRef);
      uploadBytes(imgRef, file)
        .then((e) => {
          getDownloadURL(e['ref'])
            .then(async (url: string) => {
              console.log(url);
              item.urlFotos.push(url);
              i++;
              if (i == files.length) {
                console.log('this.create(item)');
                this.usuariosService.insert(item, id).then(() => {
                  this.insert(item, id).then( () => { this.toastr.success("Paciente creado con exito!", "Exitoso!") });
                })
              }
            })
            .catch((err) => console.error('getDownloadURL: ', err));
        })
        .catch((err) => console.error(err));
    });
  }
}
