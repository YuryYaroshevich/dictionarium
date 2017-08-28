import {Http, Response, Headers} from "@angular/http";
import {AbstractService} from "./abstract.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../model/user";

@Injectable()
export class AuthService extends AbstractService {
    private authUrl = 'http://localhost:8081/authentication';

    constructor(private http: Http) {
        super();
    }

    public signIn(username: string, password: string): Observable<User> {

        return null;
    }

    public signUp(username: string, password: string): Observable<User> {
        let url = this.authUrl + '/signup';
        return this.http.post(url, new User(username, password))
            .map((response: Response) => {
                let user = response.json();
                localStorage.setItem('currentUser', JSON.stringify(user));
                return user;
            })
            .catch(this.handleError);
    }

}