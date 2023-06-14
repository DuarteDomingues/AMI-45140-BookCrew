import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FireauthService } from '../fireauthservice/fireauth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //validations_form!: FormGroup;
  public validations_form!: FormGroup;
  errorMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long.' }
    ]
  };



  constructor(private authService: FireauthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      password: new FormControl('', Validators.compose([Validators.minLength(6), Validators.required])),
    });

  }

  goBack() {
    this.router.navigate(['/sign-up-one']);
  }

  openLogin() {

    this.router.navigate(['/homepage']);

  }


  tryLogin(value) {


    this.authService.doLogin(value).then(res => {
      this.router.navigate(["/homepage"]);
    },
      err => {
        this.errorMessage = err.message;
        console.log(err)
      })
  }


}
