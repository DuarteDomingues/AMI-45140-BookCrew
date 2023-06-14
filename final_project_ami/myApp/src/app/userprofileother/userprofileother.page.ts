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
  selector: 'app-userprofileother',
  templateUrl: './userprofileother.page.html',
  styleUrls: ['./userprofileother.page.scss'],
})
export class UserprofileotherPage implements OnInit {

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
  isFriend: Number = 0;

  constructor(private router: Router, private authService: FireauthService, private googleBooks: GooglebooksService, private fireservice: FireserviceService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];


    });

    this.getCollection();

    this.getUser();
    this.get_critics()
    let result = this.fireservice.getOtherUserInfo(this.userId).subscribe(data => {

      let friends = data.payload.data()['friends_ids'];
      this.get_users_info(friends);
    });

    this.checkIsFriend();
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
    console.log("TEX", this.isFriend);

    if (this.isFriend == 3) {
      this.fireservice.sendFriendRequest(this.fireservice.userId, this.userId);
      this.isFriend =2;
      
    }
    else {
      this.fireservice.deleteFriendRequest(this.fireservice.userId, this.userId);
      this.isFriend=3;
    }
    console.log("TEX", this.isFriend);
  }
  

  checkIsFriend(){
    let friends=[];
    let friendReqs=[];
    let result = this.fireservice.getOtherUserInfo(this.userId).subscribe(data => {

      friends = data.payload.data()['friends_ids'];
      friendReqs = data.payload.data()['friend_reqs'];
      if ( friends!=null){

        if (friends.includes(this.fireservice.userId)){
          this.isFriend=1;
        }
      }
      if (friendReqs!=null){

        if (friendReqs.includes(this.fireservice.userId)){
          this.isFriend=2;
        }
        else{
          this.isFriend=3;
        }
      }
      
    });
  }

  get_users_info(friends: String[]) {

    if (this.fireservice.getUsersInfo(friends)!=null){
    this.fireservice.getUsersInfo(friends).subscribe(data => {

      data.forEach(doc => {
        let name = doc.payload.doc.data()['name'];
        let desc = doc.payload.doc.data()['desc'];
        let id_user = doc.payload.doc.data()['id'];
        let newuser = new UserInfo(id_user, name, "", desc);

        if (this.help_add(id_user)) {
          this.usersInfo.push(newuser);
        }
        
      });
    });
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

      data.forEach(doc => {
        let text = doc.payload.doc.data()['text'];
        let classif = doc.payload.doc.data()['classif'];
        let crit_data = doc.payload.doc.data()['crit_data'];
        let id_book = doc.payload.doc.data()['id_book'];

        this.createBook(id_book);

        let id_user = doc.payload.doc.data()['id_user'];
        let num_likes = doc.payload.doc.data()['num_likes'];
        let id_critic = doc.payload.doc.id;
        let critic = new Critic(id_critic, text, num_likes, id_book, id_user, classif, crit_data);
        if(this.help_add_critic(id_critic)){
          this.critics.push(critic);
        }
      });
    });
  }

  getCollection() {
    if (this.userId) { // check if userId exists
      let result = this.fireservice.getUserCollection(this.userId).subscribe(data => {
        data.forEach(doc => {
          let alreadyRead = doc.payload.doc.data()['already_read'];
          let reading = doc.payload.doc.data()['reading'];
          let toRead = doc.payload.doc.data()['to_read'];
          let idUser = doc.payload.doc.data()['id_user'];
          this.collection = new Collection(idUser);
          this.collection.lista_ler = reading;
          this.collection.lista_ja_leu = alreadyRead;
          this.collection.lista_a_ler = toRead;
        });
        this.updateBooks();
      });
    } else {
      console.log("No user ID provided"); // handle empty userId case
    }
  }

  updateBooks() {

    if (this.collection) { // check if collection exists
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

  this.router.navigate(['/friendspage'],{ queryParams: { userId: this.userId }});

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
