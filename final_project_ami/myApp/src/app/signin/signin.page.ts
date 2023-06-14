import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms'; 
import { FireauthService } from '../fireauthservice/fireauth.service'; 
import { FireserviceService} from '../services/fireservice.service'; 


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {


  validations_form: FormGroup; 
  errorMessage: string = ''; 
  successMessage: string = '';

  validation_messages = { 
    'email': [ 
      { type: 'required', message: 'Email is required.' }, 
      { type: 'pattern', message: 'Enter a valid email.' } 
    ], 
    'password': [ 
      { type: 'required', message: 'Password is required.' }, 
      { type: 'minlength', message: 'Password must be at least 6 characters long.' } 
    ] ,

    'confirmpassword': [ 
      { type: 'mismatch', message: 'Passwords do not match.' }, 
    ] 
  };
  
  
  constructor( 
    private authService: FireauthService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private fireservice: FireserviceService) { }



  ngOnInit() {

    this.validations_form = this.formBuilder.group({ 
      email: new FormControl('', Validators.compose([ 
        Validators.required, 
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') 
      ])), 
      password: new FormControl('', Validators.compose([ 
        Validators.minLength(6), 
        Validators.required 
      ])), 

    confirmpassword: new FormControl('',Validators.compose([
      Validators.required
    ])),
  }, { validators: this.passwordMatchValidator }); 


  }

  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password').value;
    const confirmpassword = g.get('confirmpassword').value;

    // If passwords do not match, set 'mismatch' error on confirmpassword control
    if (password !== confirmpassword) {
      g.get('confirmpassword').setErrors({ mismatch: true });
    } else {
      // If passwords match, clear 'mismatch' error on confirmpassword control
      g.get('confirmpassword').setErrors(null);
    }

    // Return null (no error)
    return null;
  }


  tryRegister(value){ 
    this.authService.doRegister(value) .then(res => { 
      console.log(res); 
      this.errorMessage = ""; 
      this.fireservice.createUser();
      this.router.navigate(["/homepage"]); 
    }, err => { 
      console.log(err); 
      this.errorMessage = err.message; 
      this.successMessage = ""; 
    }) 
  }


  goBack(){
    this.router.navigate(['/login']);
  }

  goForward(){
    this.router.navigate(['/homepage']);
  }




}
