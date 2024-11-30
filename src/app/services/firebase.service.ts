import { inject, Injectable } from '@angular/core';
import {Auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile,sendPasswordResetEmail,GoogleAuthProvider,signInWithPopup,user,authState,} from '@angular/fire/auth';
import { User } from '../models/user.model';
import { getAuth } from 'firebase/auth';



import { Firestore,getFirestore,setDoc,doc,getDoc,addDoc,collection,collectionData,query,updateDoc,deleteDoc } from '@angular/fire/firestore';
import { get } from 'firebase/database';
import { UtilsService } from './utils.service';

///
import {getDownloadURL,ref,Storage,uploadString,deleteObject} from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth=inject(Auth);
  firestore=inject(Firestore);
  ///
  storage=inject(Storage);

  utilsSvc=inject(UtilsService);

  constructor() { }

    //============================ AUTENTICACION ============================
  
  //obtner usuario actual
  obtenerUsuario(){
    return getAuth();
  }
    

  //metodo para acceder
  async login(user:User){
    const usuario = await signInWithEmailAndPassword(this.auth,user.email, user.password);// se loguea el usuario
    return usuario; // se retorna el usuario
  }

  //metodo para registrarse
  async registrarse(user:User){
    const usuario = await createUserWithEmailAndPassword(this.auth,user.email, user.password);// se registra el usuario
    return usuario; //  se retorna el usuario
  }

  //actualizar usuario
  async updateUser(displayName:string){
    return updateProfile(getAuth().currentUser,{displayName});// se actualiza el usuario
  }

  //Enviar correo de recuperacion de contraseña
  recuperarContrasena(email:string){
    return sendPasswordResetEmail(getAuth(),email); 
  }

  //cerrar sesion
  cerrarSesion(){
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/login');
  }
  

  //============================ BASE DE DATOS ============================
  //setear documento
  setDocument(path:string,data:any) {
    return setDoc(doc(getFirestore(),path),data);
  }

  //OBTENER DOCUMENTO 

  async getDocument(path:string) {
    return (await getDoc(doc(getFirestore(),path))).data();
  }

  //agregar un documento
  addDocument(path:string,data:any) {
    return addDoc(collection(getFirestore(),path),data);
  }

  //Obtener un documento de una coleccion
  getCollectionData(path:string,collectionquery?:any){
    const ref = collection(getFirestore(),path);
    return collectionData(query(ref,...collectionquery),{idField:'id'});
    
  }
  //actualizar documento
  updateDocument(path:string,data:any) {
    return updateDoc(doc(getFirestore(),path),data);
  }

  //eliminar documento
  deleteDocument(path:string) {
    return deleteDoc(doc(getFirestore(),path));
  }

  //============================ ALMACENAMIENTO ============================

  async uploadImage(path:string,data_url:string){ 
    return uploadString(ref(getStorage(), path),data_url,'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path));
    });
  }

  //Obtener ruta de la imagen con su url
  async obtenerUrlImagen(url:string){
    return ref(getStorage(),url).fullPath;
  }

  //eliminar archivo
  async eliminarArchivo(path:string){
    return deleteObject(ref(getStorage(),path));
  }

}
