import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../domain/book';
import { GooglebooksService } from '../googlebooks/googlebooks.service';
import { FireserviceService } from '../services/fireservice.service';
import { FireauthService } from '../fireauthservice/fireauth.service'

@Component({
  selector: 'app-collection-books',
  templateUrl: './collection-books.page.html',
  styleUrls: ['./collection-books.page.scss'],
})
export class CollectionBooksPage implements OnInit {

  colType: string;
  bookIds: string[];
  books: Book[]=[];
  userId: string;

  constructor(private router: Router, private authService: FireauthService, private route: ActivatedRoute, private googleBooks: GooglebooksService,
    private fireservice: FireserviceService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {

      this.colType = params['colType'];
      const books_ids = params['books_ids'];
      this.bookIds = books_ids.split(',');
      this.userId = params['userId'];
    });
    this.getBooksInfo();
  }

  getBooksInfo() {
    this.googleBooks.getBooksInfo(this.bookIds).subscribe(books => {
      this.books = books;
    });
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


  goProfile() {
    this.router.navigate(['/userprofile']);
  }

  

  goOtherUserProfile(userId: string) {
    this.router.navigate(['/userprofileother'], { queryParams: { userId: userId } });
  }


  goLogout(){
    this.authService.doLogout();
    this.router.navigate(['/sign-up-one']);
  }
  

  goToBook(bookId: String) {
    this.router.navigate(['/bookpage'], { queryParams: { bookId: bookId } });
  }

  goBack(){
    this.router.navigate(['/collection'],{ queryParams: { userId: this.userId }});
  }

}
