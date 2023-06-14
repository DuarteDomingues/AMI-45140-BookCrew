import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Collection } from '../domain/collection';
import { FireserviceService } from '../services/fireservice.service';
import { GooglebooksService } from '../googlebooks/googlebooks.service';
import { Book } from '../domain/book';
import { FireauthService } from '../fireauthservice/fireauth.service'

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {

  collection?: Collection;

  BooksAlreadyRead = [];
  BooksReading = [];
  BooksToRead = [];
  userId:string;
  constructor(private router: Router, private authService: FireauthService,private route: ActivatedRoute, private googleBooks: GooglebooksService, private fireservice: FireserviceService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId=params['userId'];

    });
    this.getCollection();
  }

  getCollection() {

    let result = this.fireservice.getUserCollection(this.userId).subscribe(data => {

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
      this.updateBooks();
    });

  }

  truncateString(str: string): string {
    if (str.length > 15) {
      return `${str.substring(0, 15)}...`;
    } else {
      return str;
    }
  }

  updateBooks() {

    for (let i = 0; i < this.collection.lista_ler.length; i++) {
      this.googleBooks.getBookInfo(this.collection.lista_ler[i]).subscribe(book => {
        
        let book_col = new Book(book.id_book, this.truncateString(book.title), this.truncateString(book.autor), book.genre, book.classif, book.num_pag, book.desc, book.ref_foto);
        if(this.help_add(book.id_book,book_col )){
          this.BooksToRead.push(book_col);
        }
      });
    }

    for (let i = 0; i < this.collection.lista_a_ler.length; i++) {
      this.googleBooks.getBookInfo(this.collection.lista_a_ler[i]).subscribe(book => {
        let book_col = new Book(book.id_book, this.truncateString(book.title), this.truncateString(book.autor), book.genre, book.classif, book.num_pag, book.desc, book.ref_foto);
        if(this.help_add(book.id_book,book_col )){
          this.BooksReading.push(book_col);
        }
      });
    }

    for (let i = 0; i < this.collection.lista_ja_leu.length; i++) {

      this.googleBooks.getBookInfo(this.collection.lista_ja_leu[i]).subscribe(book => {
        let book_col = new Book(book.id_book, this.truncateString(book.title), this.truncateString(book.autor), book.genre, book.classif, book.num_pag, book.desc, book.ref_foto);
        if(this.help_add(book.id_book,book_col )){
          this.BooksAlreadyRead.push(book_col);
        }
      });
    }

  }

  help_add(id_book: string, sub_col) {

    for (let i = 0; i < sub_col.length; i++) {

      if (sub_col[i].id_book === id_book) {
        return false;
      }
    }
    return true;
  }

  goHome() {

    this.router.navigate(['/homepage']);
  }

  goCollection() {
    this.router.navigate(['/collection'],{ queryParams: { userId: this.fireservice.userId }});
  }


  goSearch() {

    this.router.navigate(['/searchfull']);

  }
  goLogout(){
    this.authService.doLogout();
    this.router.navigate(['/sign-up-one']);
  }

  goProfile() {
    this.router.navigate(['/userprofile']);
  }

  goOtherUserProfile(userId: string) {
    this.router.navigate(['/userprofileother'], { queryParams: { userId: userId } });
  }


  goToBook(bookId: String) {
    this.router.navigate(['/bookpage'], { queryParams: { bookId: bookId } });
  }

  goMap(){
    this.router.navigate(['/map']);

  }

  goCollectionFull(col_type: string, value) {

    if (value == 0) {

      this.router.navigate(['/collection-books'], { queryParams: { colType: col_type, books_ids: this.collection.lista_ler.join(','),userId:this.userId } });
    }
    else if (value == 1) {
      this.router.navigate(['/collection-books'], {
        queryParams: {
          colType: col_type, books_ids: this.collection.lista_ja_leu
            .join(','),userId:this.userId 
        }
      });

    }
    else if (value == 2) {
      this.router.navigate(['/collection-books'], { queryParams: { colType: col_type, books_ids: this.collection.lista_a_ler.join(','),userId:this.userId  } });

    }
  }





}
