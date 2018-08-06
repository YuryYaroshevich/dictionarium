import { Component } from '@angular/core';
import {AuthService} from "./dictionary/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'my-app',
  styleUrls: [ 'app.css' ],
  templateUrl: 'app.html'
})
export class MyApp {

  constructor(private authService: AuthService,
              private router: Router) {}

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      this.router.navigate(['/']);
      location.reload();
    });

  }

  isLoggedIn(): boolean {
      return this.authService.isLoggedIn();
  }

  user(): string {
      return this.authService.getEmail();
  }
}
