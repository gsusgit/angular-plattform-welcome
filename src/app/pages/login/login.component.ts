import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userExists = true;
  userForm: FormGroup = this.formBuilder.group({
    email: ['jesus.fernandez@gesthispania.com', Validators.required],
    password: ['1234', [Validators.required]]
  });
  API_URL = 'http://localhost:3000/api/getUser';

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) { }

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
      const email = this.userForm.value.email;
      const password = this.userForm.value.password;
      this.http.get(`${this.API_URL}/${email}`).subscribe((data: any) => {
        if(!data.length) {
          this.userExists = false;
        } else {
          this.userExists = true;
          this.router.navigate(['/list/']);
          localStorage.setItem('geos_user', email);
          localStorage.setItem('geos_password', password);
        }
      })
    }
  }

}
