import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireauthService } from '../fireauthservice/fireauth.service'; 
import { FireserviceService} from '../services/fireservice.service'; 


@Component({
  selector: 'app-sign-up-one',
  templateUrl: './sign-up-one.page.html',
  styleUrls: ['./sign-up-one.page.scss'],
})
export class SignUpOnePage implements OnInit {

  constructor(private router: Router,  private authService: FireauthService, 
    private fireservice: FireserviceService) { }

  ngOnInit() {
  }

  openLoginGoogle(){
    this.tryRegister();
  }

  openSignin(){
    this.router.navigate(['/login']);
  }


  tryRegister(){ 
    this.authService.doLoginGoogle().then(res => { 
      console.log(res); 
      this.fireservice.createUser();
      this.router.navigate(['/homepage']);
    }, err => { 
      console.log(err); 
    }) 
  }


}
