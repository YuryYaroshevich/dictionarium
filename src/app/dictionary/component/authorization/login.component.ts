import {Component} from "@angular/core";
import {AuthService} from "../../service/auth.service";


@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    username: string;
    password: string;

    constructor(private authService: AuthService) {}

    signIn(): void {
        this.authService.signIn(this.username, this.password).subscribe();
    }

    signUp(): void {
        this.authService.signUp(this.username, this.password).subscribe();
    }
}