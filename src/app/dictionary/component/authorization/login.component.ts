import {Component} from "@angular/core";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";


@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    email: string;
    password: string;
    userCreated: boolean;

    constructor(private authService: AuthService,
                private router: Router) {}

    signIn(): void {
        this.authService.signIn(this.email, this.password)
            .subscribe(
                () => this.router.navigate(['dictionary']),
                error => console.log(error)
            );
    }

    gmail(): void {
        this.authService.gmailSignin()
            .subscribe(
                () => this.router.navigate(['dictionary']),
                error => console.log(error))
    }

    signUp(): void {
        this.authService.signUp(this.email, this.password)
            .subscribe(() => this.userCreated = true);
    }
}