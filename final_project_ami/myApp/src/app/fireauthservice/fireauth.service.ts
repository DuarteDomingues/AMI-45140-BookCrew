//import * as firebase from 'firebase/app';
import { FireserviceService } from '../fireservices/fireservice.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor(private firebaseService: FireserviceService, public afAuth: AngularFireAuth) { }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      console.log("name", value.name);
      console.log(value);
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res), err => reject(err))
      
    })
  }


  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res), err => reject(err))
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      console.log("da logout sff")
      this.afAuth.signOut().then((res) => {
        this.firebaseService.unsubscribeOnLogOut();
        resolve(res);
        
      }).catch((error) => {
        console.log(error);
        reject();
      });
    })
  }


  doLoginGoogle() {
    let x = new firebase.auth.GoogleAuthProvider();

    return new Promise<any>((resolve, reject) => { 
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()) 
      .then(res => resolve(res), err => reject(err))});
  }



}

