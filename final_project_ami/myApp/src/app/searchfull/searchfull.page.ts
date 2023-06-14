import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GooglebooksService } from '../googlebooks/googlebooks.service';
import { FireserviceService } from '../services/fireservice.service';
import { FireauthService } from '../fireauthservice/fireauth.service'
import { UserInfo } from '../domain/user_info';
import { info } from 'console';

@Component({
  selector: 'app-searchfull',
  templateUrl: './searchfull.page.html',
  styleUrls: ['./searchfull.page.scss'],
})
export class SearchfullPage implements OnInit {

  searchTerm: string = '';
  selectedOption: string = 'option1';
  searchResults: string[] = []; // List of suggestions
  showResults: boolean = false; // Flag to control visibility of search results
  
  books = [];
  usersInfo =[];


  onSearchKeyPress(event: KeyboardEvent) {

    if (event.key === 'Enter' && this.selectedOption==='option1') {
      this.usersInfo=[];
      this.getBooks();

    }
    else if(event.key === 'Enter' && this.selectedOption==='option2'){
      this.books=[];
      this.get_users_info(this.searchTerm);
    }
  }


  constructor(private router: Router,     private authService: FireauthService,
    private googleBooks: GooglebooksService, private fireservice: FireserviceService) { }

  ngOnInit() {
  }


  get_users_info(nameInput: string) {


    let infoU = [];
    if (nameInput && nameInput!="") { // check if friends array exists and is not empty
      this.fireservice.getUsersByName(nameInput).subscribe(data => {
        if (data && data.length) { // check if data exists and is not empty
          data.forEach(doc => {
            let name = doc.payload.doc.data()['name'];
            let id_user = doc.payload.doc.data()['id'];
            let desc = doc.payload.doc.data()['desc'];

            console.log("NAME", name);
            if (id_user && name) { // check if required fields exist and are not empty
              let newuser = new UserInfo(id_user, name, "", desc);
              if (this.help_add(id_user,infoU)) {
                infoU.push(newuser);
              }
            } 
            else {
              console.log("User info is missing required fields");
            }
          });
          this.usersInfo = infoU;

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



  help_add(idUser: string, usersInfo: UserInfo[]) {

    for (let i = 0; i < usersInfo.length; i++) {

      if (usersInfo[i].id_user === idUser) {
        return false;
      }
    }
    return true;
  }











  getBooks(){
    this.googleBooks.getBooksByName(this.searchTerm,2).subscribe(books => {
      this.books = books;
      this.showResults=true;
    });
  }


  goOtherUserProfile(userId: string) {
    this.router.navigate(['/userprofileother'], { queryParams: { userId: userId } });
  }




  goHome(){
    this.router.navigate(['/homepage']);
  }

  goBack(){
    this.router.navigate(['/homepage']);
  }

  goCollection() {
    this.router.navigate(['/collection'],{ queryParams: { userId: this.fireservice.userId }});
  }


  goSearch(){

this.router.navigate(['/searchfull']);

  }

  goProfile() {
    this.router.navigate(['/userprofile']);
  }
  goLogout(){
    this.authService.doLogout();
    this.router.navigate(['/sign-up-one']);
  }

 goToBook(bookId: String){
    this.router.navigate(['/bookpage'], { queryParams: { bookId: bookId } });
 }

}
