import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import { ToastrMessageService } from '../../services/toastr-message.service';
import { ActivatedRoute, Router } from '@angular/router';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './must-match.validator';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ToastrMessageService]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private _toastrMessageService: ToastrMessageService
  ) {}

  // On Page load
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },
    { validator: MustMatch('password', 'confirmPassword') });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
    // for create
    const userPostDatas = {
      fname: this.signupForm.value.fname,
      lname: this.signupForm.value.lname,
      email: this.signupForm.value.email,
      phone: this.signupForm.value.phone,
      password: this.signupForm.value.password
    };
    // console.log(userPostDatas);
    this.createUserDetails(userPostDatas);
  }

  onReset() {
    this.submitted = false;
    this.signupForm.reset();
  }

  createUserDetails(userPostDatas) {
    return this.httpService.post('/users/createUser/', userPostDatas)
      .subscribe(
        (data: { status: number, response: string, data: Array<any> }) => {
          console.log(data);
          if (data.status === 1 && (data.data.length > 0)) {
            console.log('Get created user data on user create page', data.data);
            this._toastrMessageService.typeSuccess('User created successfully');
            this.onReset(); // for reset the form
          } else {
            this._toastrMessageService.typeError('User not created successfully');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
