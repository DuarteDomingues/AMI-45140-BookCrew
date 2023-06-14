import { Component, OnInit } from '@angular/core';
import { FireauthService } from '../fireauthservice/fireauth.service'
import { FireserviceService } from '../services/fireservice.service';
import { UserInfo } from '../domain/user_info';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-friendrequests',
  templateUrl: './friendrequests.page.html',
  styleUrls: ['./friendrequests.page.scss'],
})
export class FriendrequestsPage implements OnInit {


  userId: string;
  usersInfo=[];
  usersRemoved=[];
  friends=[];

  constructor(private router: Router, private authService: FireauthService, private fireservice: FireserviceService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      console.log("user", this.userId);

    });
    let result = this.fireservice.getOtherUserInfo(this.userId).subscribe(data => {

      this.friends = data.payload.data()['friend_reqs'];
      if (this.friends.length!=0 && this.friends!=null){
      this.get_users_info(this.friends);
      }
    });

  }

  get_users_info(friends: String[]) {

    console.log("friends:",friends);
    if(friends.length!=0 && friends!=null){
    this.fireservice.getUsersInfo(friends).subscribe(data => {

      data.forEach(doc => {
        let name = doc.payload.doc.data()['name'];
        let id_user = doc.payload.doc.id;
        let desc = doc.payload.doc.data()['desc'];

        let user = new UserInfo(id_user, name, "",desc);
        if (this.help_add(id_user)) {
          this.usersInfo.push(user);
        }

      });
    });
  }
}

help_add(idUser: string) {

  if(this.usersRemoved.includes(idUser)){
    return false;
  }

  for (let i = 0; i < this.usersInfo.length; i++) {

    if (this.usersInfo[i].id_user === idUser || this.usersRemoved.includes(idUser)) {
      return false;
    }
  }
  return true;
}


accFriendReq(idUser: string){

  this.usersRemoved.push(idUser);

  for (let i = 0; i < this.usersInfo.length; i++) {

    if (this.usersInfo[i].id_user === idUser) {
     this.usersInfo.splice(i,1);
    }
  }

  this.fireservice.addFriendRequest(this.fireservice.userId, idUser);

}



removeFriendReq(idUser: string){
  this.usersRemoved.push(idUser);

  for (let i = 0; i < this.usersInfo.length; i++) {

    if (this.usersInfo[i].id_user === idUser) {
     this.usersInfo.splice(i,1);
    }
  }

  this.fireservice.deleteFriendRequest(this.fireservice.userId, idUser);
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
    this.router.navigate(['/userprofile'], { queryParams: { userId: this.fireservice.userId} });
  }

  goLogout(){
    this.authService.doLogout();
    this.router.navigate(['/sign-up-one']);
  }

  goBack(){
    this.router.navigate(['/userprofileother'], { queryParams: { userId: this.userId } });

  }
  goOtherUserProfile(userId: string) {
    this.router.navigate(['/userprofileother'], { queryParams: { userId: userId } });
  }

}
