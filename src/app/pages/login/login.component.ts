import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
      this.http.get(`${this.API_URL}/${userName}`).subscribe((data: any) => {
        if(!data.length) {
          this.userExists = false;
        } else {
          this.userExists = true;
          this.router.navigate(['/list/']);
          this.cookieService.set('_g.e.username', encodeURIComponent(data[0].username));
        }
      })
    }
  }

}
