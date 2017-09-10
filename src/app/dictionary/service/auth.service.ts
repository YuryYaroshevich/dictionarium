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
            .map(this.saveToken)
            .catch(this.handleError);
    }

    protected saveToken(res: Response) {
        if (res.status === 200) {
            let token = res.headers.get("Authorization");
            localStorage.setItem("token", token);
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

    public logout(): Observable<any> {
        let url = 'http://localhost:8081/logout';
        return this.http.post(url, {}).map(this.extractData).catch(this.handleError);
    }

    public getToken(): string {
        return localStorage.getItem("token");
    }

}