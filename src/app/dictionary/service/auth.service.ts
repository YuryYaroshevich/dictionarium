import {Http, Response, Headers} from "@angular/http";
import {AbstractService} from "./abstract.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Account} from "../model/account";

@Injectable()
export class AuthService extends AbstractService {
    private authUrl = 'http://localhost:8081/auth';
    private loginUrl = 'http://localhost:8081/login';

    constructor(private http: Http) {
        super();
    }

    public signIn(email: string, password: string): Observable<void> {
        return this.http.post(this.loginUrl,
                            new Account(email, password))
            .map(res => this.saveUserInfo(res, email))
            .catch(this.handleError);
    }

    protected saveUserInfo(res: Response, email: string) {
        if (res.status === 200) {
            let token = res.headers.get("Authorization");
            localStorage.setItem("token", token);
            localStorage.setItem("email", email);
        } else {
            throw new Error("User credentials are incorrect.")
        }
    }

    public signUp(email: string, password: string): Observable<void> {
        let account: Account = new Account(email, password);
        let url = this.authUrl + '/sign-up';
        return this.http.post(url, account)
            .map(this.signUpResponse)
            .catch(this.handleError);
    }

    protected signUpResponse(res: Response) {
        if (res.status !== 201) {
            throw new Error("Error happened during profile creation.")
        }
    }

    public logout(): void {
        localStorage.removeItem("token");
    }

    public getToken(): string {
        return localStorage.getItem("token");
    }

    public getEmail(): string {
        return localStorage.getItem("email");
    }

    public isLoggedIn(): boolean {
        return localStorage.getItem("token") !== null;
    }

    public authorizationHeaderAsObject(): object {
        let token = this.getToken();
        return {headers: new Headers({"Authorization": token})};
    }

    public authorizationHeader(): Headers {
        let token = this.getToken();
        return new Headers({"Authorization": token});
    }

}