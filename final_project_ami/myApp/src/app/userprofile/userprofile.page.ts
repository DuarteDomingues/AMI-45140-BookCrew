import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FireserviceService } from '../services/fireservice.service';
import { UserInfo } from '../domain/user_info';
import { Critic } from '../domain/critic';
import { Book } from '../domain/book';
import { GooglebooksService } from '../googlebooks/googlebooks.service';
import { Collection } from '../domain/collection';
import { FireauthService } from '../fireauthservice/fireauth.service'

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {

  userId: string;
  user?: any;
  users: string[];
  usersInfo: UserInfo[] = [];
  critics = [];
  books = [];
  userOption: any;
  collection?: Collection;
  booksCol= [];
  

  buttonText: string = 'Add Friend';

  constructor(private router: Router, private authService: FireauthService, private googleBooks: GooglebooksService, private fireservice: FireserviceService, private route: ActivatedRoute) { }

  ngOnInit() {

   this.userId= this.fireservice.userId;

    this.getCollection();

    this.getUser();
    this.get_critics()
    let result = this.fireservice.getOtherUserInfo(this.userId).subscribe(data => {

      let friends = data.payload.data()['friends_ids'];
      this.get_users_info(friends);
    });
  }

  getUser() {
    let result = this.fireservice.getOtherUserInfo(this.userId).subscribe(data => {

      let desc = data.payload.data()['desc'];
      let name = data.payload.data()['name'];
      let idUser = data.payload.data()['id'];
      this.user = new UserInfo(idUser, name, "", desc);
    });
  }

  sendRequest() {

    if (this.buttonText === 'Add Friend') {
      this.buttonText = 'Remove Friend';
      this.fireservice.sendFriendRequest(this.fireservice.userId, this.userId);
    }
    else {
      this.buttonText = 'Add Friend';
      this.fireservice.deleteFriendRequest(this.fireservice.userId, this.userId);
    }
  }


  get_users_info(friends: string[]) {
    if (friends && friends.length) { // check if friends array exists and is not empty
      this.fireservice.getUsersInfo(friends).subscribe(data => {
        if (data && data.length) { // check if data exists and is not empty
          data.forEach(doc => {
            let name = doc.payload.doc.data()['name'];
            let desc = doc.payload.doc.data()['desc'];
            let id_user = doc.payload.doc.data()['id'];
            if (id_user && name) { // check if required fields exist and are not empty
              let newuser = new UserInfo(id_user, name, "", desc);
              if (this.help_add(id_user)) {
                this.usersInfo.push(newuser);
              }
            } else {
              console.log("User info is missing required fields");
            }
          });
        } else {
          console.log("No user info found for friends"); // handle empty data case
        }
      }, error => {
        console.error("Error getting user info for friends:", error); // handle error case
      });
    } else {
      console.log("No friends provided"); // handle empty friends array case
    }
  }



  help_add(idUser: string) {

    for (let i = 0; i < this.usersInfo.length; i++) {

      if (this.usersInfo[i].id_user === idUser) {
        return false;
      }
    }
    return true;
  }

  

  get_critics() {
    this.fireservice.getCriticsUser(this.userId).subscribe(data => {
      if (data && data.length) { // check if data exists and is not empty
        data.forEach(doc => {
          let text = doc.payload.doc.data()['text'];
          let classif = doc.payload.doc.data()['classif'];
          let crit_data = doc.payload.doc.data()['crit_data'];
          let id_book = doc.payload.doc.data()['id_book'];
  
          if (id_book && text && classif && crit_data) { // check if required fields exist and are not empty
            this.createBook(id_book);
  
            let id_user = doc.payload.doc.data()['id_user'];
            let num_likes = doc.payload.doc.data()['num_likes'];
            let id_critic = doc.payload.doc.id;
            let critic = new Critic(id_critic, text, num_likes, id_book, id_user, classif, crit_data);
  
            if (this.help_add_critic(id_critic)) {
              this.critics.push(critic);
            }
          } else {
            console.log("Critic data is missing required fields");
          }
        });
      } else {
        console.log("No critics found for user"); // handle empty data case
      }
    }, error => {
      console.error("Error getting user critics:", error); // handle error case
    });
  }




  getCollection() {
    let result = this.fireservice.getUserCollection(this.userId).subscribe(data => {
      if (data && data.length) { // check if data exists and is not empty
        data.forEach(doc => {
          let alreadyRead = doc.payload.doc.data()['already_read'];
          let reading = doc.payload.doc.data()['reading'];
          let toRead = doc.payload.doc.data()['to_read'];
          let idUser = doc.payload.doc.data()['id_user'];
  
          if (idUser && (alreadyRead || reading || toRead)) { // check if required fields exist and are not empty
            this.collection = new Collection(idUser);
            this.collection.lista_ler = reading;
            this.collection.lista_ja_leu = alreadyRead;
            this.collection.lista_a_ler = toRead;
          }
        });
        this.updateBooks();
      } else {
        console.log("No data found for user"); // handle empty data case
      }
    }, error => {
      console.error("Error getting user collection:", error); // handle error case
    });
  }

  updateBooks() {

    for (let i = 0; i < this.collection.lista_ler.length; i++) {
      this.googleBooks.getBookInfo(this.collection.lista_ler[i]).subscribe(book => {
        
        let book_col = new Book(book.id_book, this.truncateString(book.title), this.truncateString(book.autor), book.genre, book.classif, book.num_pag, book.desc, book.ref_foto);
        this.booksCol.push(book_col);
      });
    }

    for (let i = 0; i < this.collection.lista_a_ler.length; i++) {
      this.googleBooks.getBookInfo(this.collection.lista_a_ler[i]).subscribe(book => {
        let book_col = new Book(book.id_book, this.truncateString(book.title), this.truncateString(book.autor), book.genre, book.classif, book.num_pag, book.desc, book.ref_foto);
        this.booksCol.push(book_col);
      });
    }

    for (let i = 0; i < this.collection.lista_ja_leu.length; i++) {

      this.googleBooks.getBookInfo(this.collection.lista_ja_leu[i]).subscribe(book => {
        let book_col = new Book(book.id_book, this.truncateString(book.title), this.truncateString(book.autor), book.genre, book.classif, book.num_pag, book.desc, book.ref_foto);
        this.booksCol.push(book_col);
      });
    }
  }

  truncateString(str: string): string {
    if (str.length > 15) {
      return `${str.substring(0, 15)}...`;
    } else {
      return str;
    }
  }


  help_add_critic(id_critic: string) {

    for (let i = 0; i < this.critics.length; i++) {

      if (this.critics[i].id_critic === id_critic) {
        return false;
      }
    }
    return true;
  }

  createBook(id_book) {
    this.googleBooks.getBookInfo(id_book).subscribe(book => {
      book = new Book(book.id_book, book.title, book.autor, book.genre, book.classif, book.num_pag, book.desc, book.ref_foto);
      this.books.push(book);
    });
  }

  goToBook(bookId: String) {
    this.router.navigate(['/bookpage'], { queryParams: { bookId: bookId } });
  }

  getBook(bookId: String): Book | null {

    let book = this.books.find(book => book.id_book === bookId);
    return book;
  }

  goHome() {

    this.router.navigate(['/homepage']);
  }

  goCollection() {
    this.router.navigate(['/collection'],{ queryParams: { userId: this.userId }});
  }

  goSearch() {

    this.router.navigate(['/searchfull']);

  }

  goProfile() {

    this.router.navigate(['/userprofile']);

  }

  goLogout(){
    this.authService.doLogout();
    this.router.navigate(['/sign-up-one']);
  }

goFriends(){

  this.router.navigate(['/friendspage'],{ queryParams: { userId: this.fireservice.userId }});

}

goFriendRequests(){

  this.router.navigate(['/friendrequests'],{ queryParams: { userId: this.userId }});


}

goMap(){
  this.router.navigate(['/map']);

}

/*
  goOtherUserProfile(userId: string) {

    const url = `/userprofile?userId=${userId}&isCurr=false`;
    // Navigate to the URL without adding a new history entry and skip location change
    this.router.navigateByUrl(url, { skipLocationChange: true }).then(() => {
      // Force a view refresh after navigation
      location.reload();
    });
  }
  */

}
