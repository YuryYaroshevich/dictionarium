import { Component } from '@angular/core';
import {AuthService} from "./dictionary/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'my-app',
  styleUrls: [ 'app.css' ],
  templateUrl: 'app.html'
})
export class MyApp {
  userLoggedIn: boolean = true;

  constructor(private authService: AuthService,
              private router: Router) {}

  logout() {
    this.authService.logout()
        .subscribe(() => {
          this.userLoggedIn = false;
          this.router.navigate(['dictionary']);
        });
  }
}
