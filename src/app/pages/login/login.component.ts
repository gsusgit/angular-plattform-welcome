import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userExists = true;
  userForm: FormGroup = this.formBuilder.group({
    username: ['jesus.fernandez', Validators.required],
    password: ['1234', [Validators.required]]
  });
  API_URL = 'http://localhost:3000/api/getUser';

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  get form() {
    return this.userForm.controls;
  }

  onSubmit()
  {
    if(this.userForm.invalid)
    {
      return;
    }
    else
    {
      const userName = this.userForm.value.username;
      const password = this.userForm.value.password;
      const body = {
        username: userName,
        password: password
      };
      this.http.post(`${this.API_URL}`, body).subscribe((data: any) => {
        if(!data) {
          this.userExists = false;
        } else {
          this.userExists = true;
          const navigationExtras: NavigationExtras = {
            state: data
          };
          this.router.navigate(['list'], navigationExtras);
          this.cookieService.set('_g.e.username', encodeURIComponent(data.username));
        }
      })
    }
  }

}
