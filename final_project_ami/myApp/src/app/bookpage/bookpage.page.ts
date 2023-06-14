import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { GooglebooksService } from '../googlebooks/googlebooks.service';
import { Book } from '../domain/book';
import { Timestamp } from "@firebase/firestore";
import { FireserviceService } from '../services/fireservice.service';
import { Critic } from '../domain/critic';
import { Collection } from '../domain/collection';
import { UserInfo } from '../domain/user_info';

@Component({
  selector: 'app-bookpage',
  templateUrl: './bookpage.page.html',
  styleUrls: ['./bookpage.page.scss'],
})
export class BookpagePage implements OnInit {


  newCritic: string = '';
  book = new Book("", "", "", "", 0, 0, "", "");
  bookId: string;

  critics: Critic[] = [];
  collection?: Collection;

  bookCol: Number=0;

  selectedRating: Number=0;

  userIds: string[]=[];
  users: UserInfo[]=[];

  constructor(private router: Router, private location: Location, private route: ActivatedRoute, private googleBooks: GooglebooksService,
    private fireservice: FireserviceService) {


  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.bookId = params['bookId'];

    });

    this.createBook(this.bookId);
    this.getCritics();
    this.getCollection();
  }



  getCritics() {

    this.fireservice.getCriticsBook(this.bookId).subscribe(data => {

      data.forEach(doc => {
        let text = doc.payload.doc.data()['text'];
        let id_crit = doc.payload.doc.id;
        let data_crit = doc.payload.doc.data()['crit_data'].toDate();
        let options = { year: 'numeric', month: 'short', day: 'numeric' };
        let data_string = data_crit.toLocaleString('en-US', options);
        let user_crit = doc.payload.doc.data()['id_user'];

        this.userIds.push(user_crit);
        let num_likes = doc.payload.doc.data()['num_likes'];
        let classif = doc.payload.doc.data()['classif'];
        let critic = new Critic(id_crit, text, num_likes, this.bookId, user_crit, classif, data_string);

        if (this.help_add(id_crit)) {
          this.critics.push(critic);
        }
      });
      this.userIds=[...new Set(this.userIds)];
      this.get_users();
    });
    
  }

  get_users() {

    if (!this.userIds || this.userIds.length === 0) {
      console.error('Invalid input: user IDs not provided.');
      return;
    }
    if (!this.fireservice) {
      console.error('Invalid input: Firebase service not provided.');
      return;
    }
  
    this.fireservice.getUsers(this.userIds).subscribe(data => {
      if (!data || data.length === 0) {
        console.warn('No users found for the provided IDs.');
        return;
      }
  
      data.forEach(doc => {
        let name = doc.payload.doc.data()['name'];
        let id = doc.payload.doc.data()['id'];
        let user = new UserInfo(id, name, "", "");
        this.users.push(user);
      });
    });




  }

  getUserInfo(userId: string): UserInfo | null {

    let user = this.users.find(user => user.id_user === userId);
    return user;

  }


  help_add(id_critic: string) {

    for (let i = 0; i < this.critics.length; i++) {

      if (this.critics[i].id_critic === id_critic) {
        return false;
      }
    }
    return true;
  }


  createBook(id_book) {
    this.googleBooks.getBookInfo(id_book).subscribe(bookInfo => {
      //book = new Book(book.id_book, book.title, book.autor, book.genre, book.classif, book.num_pag, book.desc, book.ref_foto);
      this.book.setId_book(bookInfo.id_book);
      this.book.setAutor(bookInfo.autor);
      this.book.setTitle(bookInfo.title);
      this.book.setGenre(bookInfo.genre);
      this.book.setClassif(bookInfo.classif);
      this.book.setNum_pag(bookInfo.num_pag);
      this.book.setDesc(bookInfo.desc);
      this.book.setRef_foto(bookInfo.ref_foto);
    });
  }


  submitCritic(): void {
    if (this.newCritic.trim() !== '') {

      if (this.selectedRating==0){
        alert("Enter a rating.");
      }
      else{
      let noteDate = Timestamp.fromDate(new Date());      
      this.fireservice.addCritic(this.selectedRating, noteDate, this.bookId, this.fireservice.userId, 0, this.newCritic);
      }
    }
  }
 

  getCollection() {

    let result = this.fireservice.getUserCollection(this.fireservice.userId).subscribe(data => {

      data.forEach(doc => {

        let alreadyRead = doc.payload.doc.data()['already_read'];
        let reading = doc.payload.doc.data()['reading'];
        let toRead = doc.payload.doc.data()['to_read'];
        let idUser = doc.payload.doc.data()['id_user'];

        this.collection = new Collection(idUser);
        this.collection.lista_a_ler = reading;
        this.collection.lista_ja_leu = alreadyRead;
        this.collection.lista_ler = toRead;

      });
      this.checkIfBelongs();
    });

  }


  checkIfBelongs() {

    if (this.collection.lista_a_ler.includes(this.bookId)){
      this.bookCol=1;
    }
    else if (this.collection.lista_ja_leu.includes(this.bookId)){
      this.bookCol=2;

    }
    else if (this.collection.lista_ler.includes(this.bookId)){
      this.bookCol=3;
    }
  }

  goHome() {

    this.router.navigate(['/homepage']);
  }

  goCollection() {

    this.router.navigate(['/collection']);

  }

  goSearch() {

    this.router.navigate(['/searchfull']);

  }

  goProfile() {

    this.router.navigate(['/userprofile']);

  }

  goOtherUserProfile(userId: string) {
    this.router.navigate(['/userprofile'], { queryParams: { userId: userId, isCurr: false } });
  }


  goBackButton() {

    this.router.navigate(['/homepage']);
  }

  onButtonClick(){

    const dropdown = document.getElementById('myDropdown') as HTMLSelectElement;
    const selectedValue = dropdown.value;
    this.bookCol = parseInt(selectedValue,10);

    this.fireservice.addBookToCollection(this.bookId, this.bookCol);
    alert("Book added to collection!");

  }

  onButtonRemove(){

    this.fireservice.removeBookFromCollection(this.bookId, this.bookCol);
    this.bookCol=0;
    alert("Book removed from collection!");

  }


}
