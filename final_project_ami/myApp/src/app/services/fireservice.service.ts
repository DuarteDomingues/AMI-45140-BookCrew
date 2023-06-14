

import { AngularFirestore } from '@angular/fire/compat/firestore'
import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Injectable({
  providedIn: 'root'
})


export class FireserviceService {

  private snapshotChangesSubscription: any;
  productsName: string = 'products';
  //DEFINIR CENAS QUE VAO ESTAR SEMPRE A SER ACEDIDAS

  currentUser;
  constructor(public af: AngularFirestore,) {

    //this.userName = firebase.auth().currentUser;

  }

  getUser() {
    this.currentUser = firebase.auth().currentUser;
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  async createUser() {

    let currentUser = firebase.auth().currentUser;
    let idUser = currentUser.uid;
    let email = currentUser.email;
    let name = currentUser.email.substring(0, currentUser.email.indexOf("@"));

    if (await this.checkUserDocumentExists(currentUser.uid)==false){

    
    const user = {
      id: idUser, // replace with the desired user ID
      email: email, // replace with the user's name
      name: name, 
      desc: "In the groove",
      friend_reqs: [],
      friends_ids: [],
    };

    const col = {
      already_read: [],
      reading: [],
      to_read: [],
      id_user : idUser
    }


    let userCol = this.af.collection('User');

    userCol.doc(idUser).set(user)
      .then(() => {
        console.log('User added successfully!');
      })
      .catch((error) => {
        console.error('Error adding user: ', error);
      });

      let collectionCol = this.af.collection('Collection');

      collectionCol.doc(idUser).set(col)
      .then(() => {
        console.log('User added successfully!');
      })
      .catch((error) => {
        console.error('Error adding user: ', error);
      });
  }
  }

  checkUserDocumentExists(userId: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const docRef  = this.af.doc(`User/${userId}`);
  
      docRef.get().subscribe((doc) => {
        if (doc.exists) {
          resolve(true); // Document exists
        } else {
          resolve(false); // Document does not exist
        }
      }, (error) => {
        reject(error); // Error occurred while checking document existence
      });
    });
  }

  //get friends of current User
  getUserInfo() {

    return this.af.collection("User").doc(this.currentUser.uid).snapshotChanges();

  }

  getOtherUserInfo(userId: string) {

    return this.af.collection("User").doc(userId).snapshotChanges();

  }

  getCritic(criticId: string) {

    return this.af.collection("Critic").doc(criticId).snapshotChanges();

  }

  getUsers(userIds: string[]) {

    return this.af.collection("User", ref => ref.where("id", "in", userIds)).snapshotChanges();

  }

  getUsersByName(name: string) {
    return this.af.collection("User", ref => ref.where("name", ">=", name).where("name", "<=", name + "\uf8ff")).snapshotChanges();
  }





  getCommsCritic(criticId: string) {


    return this.af.collection("Comments", ref => ref.where("id_critic", "==", criticId)).snapshotChanges();

  }

  //{ data: () => any; }

  //get critics based on a list of user IDs
  getCritics(user_ids: String[]) {

    //return this.af.collection("Critic", ref => ref.where("id_user", "==", userId)).snapshotChanges();
    return this.af.collection("Critic", ref => ref.where("id_user", "in", user_ids)).snapshotChanges();
  }

  getCriticsUser(user_id: string) {

    //return this.af.collection("Critic", ref => ref.where("id_user", "==", userId)).snapshotChanges();
    return this.af.collection("Critic", ref => ref.where("id_user", "==", user_id)).snapshotChanges();
  }


  getCriticsBook(book_id: string) {

    //return this.af.collection("Critic", ref => ref.where("id_user", "==", userId)).snapshotChanges();
    return this.af.collection("Critic", ref => ref.where("id_book", "==", book_id)).snapshotChanges();
  }

  //get userInfo based on a list of user IDs
  getUsersInfo(user_ids: String[]) {
    if (user_ids && user_ids.length) { // check if user_ids array exists and is not empty
      return this.af.collection("User", ref => ref.where("id", "in", user_ids)).snapshotChanges();
    } else {
      console.log("No user IDs provided"); // handle empty user_ids array case
      return null;
    }
  }

  //collection
  getUserCollection(user_id: String) {
    return this.af.collection("Collection", ref => ref.where("id_user", "==", user_id)).snapshotChanges();
  }

  getCurrentUser(): string {
    return this.currentUser.uid;
  }


  //Friends
  sendFriendRequest(userId: string, friendId: string) {

    let userDoc = this.af.collection("User").doc(friendId);

    userDoc.update({ friend_reqs: firebase.firestore.FieldValue.arrayUnion(userId) })
      .then(() => {
        console.log('Friend request added successfully!');
      })
      .catch(error => {
        console.error('Error adding friend request:', error);

      })
  }

  deleteFriendRequest(userId: string, friendId: string) {

    let userDoc = this.af.collection("User").doc(friendId);

    userDoc.update({ friend_reqs: firebase.firestore.FieldValue.arrayRemove(userId) })
      .then(() => {
        console.log('Friend request removed successfully!');
      })
      .catch(error => {
        console.error('Error removing friend request:', error);
      });

  }

  //add friendReq
  addFriendRequest(userId: string, friendId: string) {

    let userDoc = this.af.collection("User").doc(userId);
    let userDoc_friend = this.af.collection("User").doc(friendId);

    //delete friend req
    userDoc.update({ friend_reqs: firebase.firestore.FieldValue.arrayRemove(friendId) })
      .then(() => {
        console.log('Friend request removed successfully!');
      })
      .catch(error => {
        console.error('Error removing friend request:', error);
      });

      //add
      userDoc.update({ friends_ids: firebase.firestore.FieldValue.arrayUnion(friendId) })
      .then(() => {
        console.log('Friend  added successfully!');
      })
      .catch(error => {
        console.error('Error adding friend :', error);

      })

      userDoc_friend.update({ friends_ids: firebase.firestore.FieldValue.arrayUnion(userId) })
      .then(() => {
        console.log('Friend  added successfully!');
      })
      .catch(error => {
        console.error('Error adding friend :', error);

      })


  }



  deleteFriend(userId: string, friendId: string) {

    let userDoc_friend = this.af.collection("User").doc(friendId);
    let userDoc = this.af.collection("User").doc(userId);

    userDoc_friend.update({ friends_ids: firebase.firestore.FieldValue.arrayRemove(userId) })
      .then(() => {
        console.log('Friend request removed successfully!');
      })
      .catch(error => {
        console.error('Error removing friend request:', error);
      });

      userDoc.update({ friends_ids: firebase.firestore.FieldValue.arrayRemove(friendId) })
      .then(() => {
        console.log('Friend request removed successfully!');
      })
      .catch(error => {
        console.error('Error removing friend request:', error);
      });

  }














  // Function to add a new comment to Firestore
  addComment(data_com, id_critic: string, text_com: string): void {

    let commentData = {
      data_com: data_com,
      id_critic: id_critic,
      id_user: this.currentUser.uid,
      text_comm: text_com
    };

    this.af.collection('Comments').add(commentData)
      .then(docRef => {
        console.log('Comment added with ID: ', docRef.id);
      })
      .catch(error => {
        console.error('Error adding comment: ', error);
      });

  }

  addCritic(classif: Number, crit_data, idBook, idUser, numLikes, text) {

    let criticData = {

      classif: Number(classif),
      crit_data: crit_data,
      id_book: idBook,
      id_user: idUser,
      num_likes: numLikes,
      text: text
    }

    this.af.collection('Critic').add(criticData)
      .then(docRef => {
        console.log('Critic added with ID: ', docRef.id);
      })
      .catch(error => {
        console.error('Error adding critic: ', error);
      });

  }

  addBookToCollection(bookId: string, bookCol) {

    let colDoc = this.af.collection("Collection").doc(this.userId);

    if (bookCol == 1) {
      colDoc.update({ reading: firebase.firestore.FieldValue.arrayUnion(bookId) })
        .then(() => {
          console.log('Book');
        })
        .catch(error => {
          console.error('Error adding friend request:', error);

        })
    }

    else if (bookCol == 2) {
      colDoc.update({ already_read: firebase.firestore.FieldValue.arrayUnion(bookId) })
        .then(() => {
          console.log('Book');
        })
        .catch(error => {
          console.error('Error adding friend request:', error);

        })
    }

    else if (bookCol == 3) {
      colDoc.update({ to_read: firebase.firestore.FieldValue.arrayUnion(bookId) })
        .then(() => {
          console.log('Book');
        })
        .catch(error => {
          console.error('Error adding friend request:', error);

        })
    }
  }

  removeBookFromCollection(bookId: string, bookCol) {

    let docRef = this.af.collection('Collection').doc(this.userId);

    // Remove book from already_read array

    if (bookCol == 1) {

      docRef.update({
        reading: firebase.firestore.FieldValue.arrayRemove(bookId)
      })
        .then(() => {
          console.log('Book removed from already_read array successfully!');
        })
        .catch((error) => {
          console.error('Error removing book from already_read array:', error);
        });
    }
    if (bookCol == 2) {

      docRef.update({
        already_read: firebase.firestore.FieldValue.arrayRemove(bookId)
      })
        .then(() => {
          console.log('Book removed from already_read array successfully!');
        })
        .catch((error) => {
          console.error('Error removing book from already_read array:', error);
        });
    }
    if (bookCol == 3) {

      docRef.update({
        to_read: firebase.firestore.FieldValue.arrayRemove(bookId)
      })
        .then(() => {
          console.log('Book removed from already_read array successfully!');
        })
        .catch((error) => {
          console.error('Error removing book from already_read array:', error);
        });
    }

  }


}
