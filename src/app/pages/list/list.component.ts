import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private router: Router,
              private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.cookieService.delete('_g.e.username');
    this.router.navigate(['/login/']);
  }
}
