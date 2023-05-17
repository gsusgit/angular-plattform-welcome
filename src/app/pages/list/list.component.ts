import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  userData: any;

  constructor(private router: Router,
              private cookieService: CookieService) {
    const navigation = this.router.getCurrentNavigation();
    // @ts-ignore
    this.userData = navigation.extras.state;
  }

  ngOnInit(): void {
  }

  logOut() {
    this.cookieService.delete('_g.e.username');
    this.router.navigate(['/login/']);
  }
}
