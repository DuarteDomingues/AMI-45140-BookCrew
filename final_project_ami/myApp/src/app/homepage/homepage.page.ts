import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FireserviceService } from '../services/fireservice.service';
import { FireauthService } from '../fireauthservice/fireauth.service'
import { Critic } from '../domain/critic';
import { UserInfo } from '../domain/user_info';
import { GooglebooksService } from '../googlebooks/googlebooks.service';
import { Book } from '../domain/book';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  critics = [];
  usersInfo = [];
  books = [];

  constructor(private router: Router,
    private fireservice: FireserviceService,
    private authService: FireauthService,
    private googleBooks: GooglebooksService,
    private route: ActivatedRoute) { }


  ngOnInit() {

    this.fireservice.getUser();
    let friends;

    let result = this.fireservice.getUserInfo().subscribe(data => {

      friends = data.payload.data()['friends_ids'];

      this.get_critics(friends);
      this.get_users_info(friends);

    });
  }

  get_critics(friends: String[]) {

    this.fireservice.getCritics(friends).subscribe(data => {

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

  
  help_add_critic(id_critic: string) {

    for (let i = 0; i < this.critics.length; i++) {

      if (this.critics[i].id_critic === id_critic) {
        return false;
      }
    }
    return true;
  }


  get_users_info(friends: String[]) {

    this.fireservice.getUsersInfo(friends).subscribe(data => {

      data.forEach(doc => {
        let name = doc.payload.doc.data()['name'];
        let id_user = doc.payload.doc.id;
        let user = new UserInfo(id_user, name, "", "");
        this.usersInfo.push(user);


      });
    });
  }

  createBook(id_book) {
    this.googleBooks.getBookInfo(id_book).subscribe(book => {
      book = new Book(book.id_book, book.title, book.autor, book.genre, book.classif, book.num_pag, book.desc, book.ref_foto);
      this.books.push(book);
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

  goReviewFull(criticId: string, userId: string, bookId: string) {

    this.router.navigate(['/reviewfull'], { queryParams: { criticId: criticId, userId: userId, bookId: bookId } });

  }

  getUserInfo(userId: string): UserInfo | null {

    let user = this.usersInfo.find(user => user.id_user === userId);
    return user;

  }

  goOtherUserProfile(userId: string) {
    this.router.navigate(['/userprofileother'], { queryParams: { userId: userId } });
  }

  getBook(bookId: String): Book | null {

    let book = this.books.find(book => book.id_book === bookId);
    return book;
  }

  goToBook(bookId: String) {
    this.router.navigate(['/bookpage'], { queryParams: { bookId: bookId } });
  }

  goLike(){
    console.log("like");
    this.router.navigate(['/userprofileother'], { queryParams: { userId: this.fireservice.userId } });


  }

  goLogout(){
    this.authService.doLogout();
    this.router.navigate(['/sign-up-one']);
  }



  goMap(){
    this.router.navigate(['/map']);

  }


}
