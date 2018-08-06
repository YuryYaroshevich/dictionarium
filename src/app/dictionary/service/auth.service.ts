import {Http, Response, Headers} from "@angular/http";
import {AbstractService} from "./abstract.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Account} from "../model/account";

@Injectable()
export class AuthService extends AbstractService {
    private authUrl = 'http://localhost:8081/auth';
    private loginUrl = 'http://localhost:8081/login';
    private gmailLoginUrl = 'http://localhost:8081/login/gmail';

    constructor(private http: Http) {
        super();
    }

    public signIn(email: string, password: string): Observable<void> {
        return this.http.post(this.loginUrl,
                            new Account(email, password))
            .map(res => this.saveUserInfo(res, email))
            .catch(this.handleError);
    }

    protected saveUserInfo(res: Response, email?: string) {
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

    public gmailSignin(): Observable<void> {
        return this.http.post(this.gmailLoginUrl, {})
            .map(this.signUpResponse)
            .catch(this.handleError);
    }

    public getOauthToken(params: object): Observable<any> {
//state=SrXpvq&code=4%2Fe3LEqeYYQhmPQH3-camF7i2iy9wQTTeFHP1C1GIo4WQ&authuser=1&session_state=50d6fcb6e4b96386d715dfbbc9895ed4e302dd6a..454c&prompt=none
        return this.http.post(this.gmailLoginUrl, {}, {
            params: {
                state: params['state'],
                code: params['code'],
                authuser: params['authuser'],
                session_state: params['session_state'],
                prompt: params['prompt']
            }})
            .map(res => this.saveUserInfo(res))
            .catch(this.handleError);
    }

    protected signUpResponse(res: Response) {
        console.log(res.status);
        if (res.status !== 201) {
            throw new Error("Error happened during profile creation.")
        }
    }

    public logout(): Observable<void> {
        return this.http.post('http://localhost:8081/logout', {},
            this.authorizationHeaderAsObject())
            .catch(this.handleError);
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

    public setToken(token: string) {
        localStorage.setItem("token", "Bearer " + token);
    }

    public setEmail(email: string) {
        localStorage.setItem("email", email);
    }
}