import { AngularFirestore } from '@angular/fire/compat/firestore'
import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FireserviceService {

  private snapshotChangesSubscription: any;


  constructor(public af: AngularFirestore,) { }


  unsubscribeOnLogOut() {
    //remember to unsubscribe from the snapshotChanges
    //firebase.auth().unsubscribe(); 
    //this.snapshotChangesSubscription.unsubscribe();

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
    });




  }
}
