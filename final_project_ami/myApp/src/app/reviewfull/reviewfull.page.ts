import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Critic } from '../domain/critic';
import { GooglebooksService } from '../googlebooks/googlebooks.service';
import { Book } from '../domain/book';
import { Comment } from '../domain/comment';
import { FireserviceService } from '../services/fireservice.service';
import { UserInfo } from '../domain/user_info';
import { Timestamp } from "@firebase/firestore";
import { Location } from "@angular/common";

@Component({
  selector: 'app-reviewfull',
  templateUrl: './reviewfull.page.html',
  styleUrls: ['./reviewfull.page.scss'],
})
export class ReviewfullPage implements OnInit {

  criticId: string;
  userId: string;
  bookId: string;
  book?: any;
  user?: any;
  critic?: any;
  comments = [];
  users = [];

  newComment: string = '';

  constructor(private router: Router,private location: Location, private route: ActivatedRoute, private googleBooks: GooglebooksService, private fireservice: FireserviceService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.criticId = params['criticId'];
      this.userId = params['userId'];
      this.bookId = params['bookId'];
      this.setBook();
      this.setUserInfo();
      this.setCritic();

      this.getComments();

    });

  }

  setBook() {
    this.googleBooks.getBookInfo(this.bookId).subscribe(book => {
      this.book = new Book(book.id_book, book.title, book.autor, book.genre, book.classif, book.num_pag, book.desc, book.ref_foto);
    });
  }

  setUserInfo() {
    let result = this.fireservice.getOtherUserInfo(this.userId).subscribe(data => {
      let name = data.payload.data()['name'];
      let id_user = data.payload.data()['id'];
      this.user = new UserInfo(id_user, name, "", "");
    });
  }

  setCritic() {
    let result = this.fireservice.getCritic(this.criticId).subscribe(data => {

      let text = data.payload.data()['text'];
      let classif = data.payload.data()['classif'];
      let crit_data = data.payload.data()['crit_data'];
      let id_book = data.payload.data()['id_book'];
      let id_user = data.payload.data()['id_user'];
      let num_likes = data.payload.data()['num_likes'];
      let id_critic = data.payload.id;
      this.critic = new Critic(id_critic, text, num_likes, id_book, id_user, classif, crit_data);
    });
  }

  getComments() {
    if (!this.fireservice) {
      console.error('Invalid input: Firebase service not provided.');
      return;
    }
    if (!this.criticId) {
      console.error('Invalid input: criticId not provided.');
      return;
    }
  
    this.fireservice.getCommsCritic(this.criticId).subscribe(data => {
      if (!data || data.length === 0) {
        console.warn('No comments found for the provided critic ID.');
        return;
      }
  
      data.forEach(doc => {
        console.log("cona");
        let text = doc.payload.doc.data()['text_comm'];
        let id_comm = doc.payload.doc.id;
        let data_com = doc.payload.doc.data()['data_com']?.toDate();
        if (!data_com) {
          console.warn(`Invalid comment data: missing or invalid data_com property for comment ID ${id_comm}.`);
          return;
        }
        let options = { year: 'numeric', month: 'short', day: 'numeric' };
        let data_string = data_com.toLocaleString('en-US', options);
        let user_com = doc.payload.doc.data()['id_user'];
        if (!user_com) {
          console.warn(`Invalid comment data: missing or invalid id_user property for comment ID ${id_comm}.`);
          return;
        }
  
        this.getUsers(user_com);
  
        let comm = new Comment(id_comm, this.criticId, user_com, text, data_string);
  
        if (this.help_add(id_comm)) {
          this.comments.push(comm);
        }
      });
    });
  }



  help_add(id_comm: string) {

    for (let i = 0; i < this.comments.length; i++) {

      if (this.comments[i].id_comment === id_comm) {
        return false;
      }
    }
    return true;
  }
  
  getUsers(user_com: string) {
    if (!user_com) {
      console.error('Invalid input: user_com not provided.');
      return;
    }
    if (!this.fireservice) {
      console.error('Invalid input: Firebase service not provided.');
      return;
    }
  
    let result = this.fireservice.getOtherUserInfo(user_com).subscribe(data => {
      if (!data || !data.payload || !data.payload.data || !data.payload.id) {
        console.warn('No user data found for the provided user ID.');
        return;
      }
  
      let name = data.payload.data()['name'];
      let id_user = data.payload.id;
      let user = new UserInfo(id_user, name, "", "");
      this.users.push(user);
    });
  }

  submitComment(): void {
    if (this.newComment.trim() !== '') {

      let noteDate = Timestamp.fromDate(new Date());
      this.fireservice.addComment(noteDate, this.criticId, this.newComment);
      this.newComment = '';

    }
  }


  getUserInfo(userId: string): UserInfo | null {

    let user = this.users.find(user => user.id_user === userId);
    return user;

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


  goToBook(bookId: String) {
    this.router.navigate(['/bookpage'], { queryParams: { bookId: bookId } });
  }
  goBackButton() {

    this.location.back();
  }


}
