import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot, DocumentData } from '@angular/fire/compat/firestore';
import { firstValueFrom, from, map, Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Especialista } from '../models/especialista';
import { Storage as FireStore, ref } from '@angular/fire/storage';
import { uploadBytes } from 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private firestore: AngularFirestore,
    private afStorage: FireStore) { }

  saveDoc(data: any, path: string, id: string | undefined) {
    const docRef = this.firestore.collection(path).doc(id);
    return docRef.set(data);
  }

  async getByEmail<TProfileEntity extends Usuario>(path: string, mail: string | undefined){
    const docRef = await firstValueFrom<TProfileEntity[]>(this.firestore.collection<TProfileEntity>(path).valueChanges()); 
    return docRef.find(x => x.mail == mail);
  }

  async UploadImage(file: any, name: string) {
    const rif = ref(this.afStorage, `images/${name}`);
    return uploadBytes(rif, file);
  }

}