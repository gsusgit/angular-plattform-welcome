import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from '../../shared/store/user.model';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { SetUserAction } from '../../shared/store/user.actions';
import { PersistUserService } from '../../services/persist.user.service';

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
              private cookieService: CookieService,
              private userStore: Store<AppState>,
              private persistUserService: PersistUserService) { }

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
          this.storeUser(data);
          this.cookieService.set('_g.e.username', encodeURIComponent(data.username));
          this.router.navigate(['list']);
        }
      })
    }
  }

  storeUser(data: any) {
    const userObject = new UserModel({
      email: data.email,
      apps: data.apps,
      name: data.name,
      lastname: data.lastname,
      username: data.username
    });
    this.userStore.dispatch(new SetUserAction(userObject));
    this.persistUserService.persistData(userObject);
  }
}
