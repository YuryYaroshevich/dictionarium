import {Injectable} from "@angular/core";
import {AbstractService} from "./abstract.service";
import {Http} from "@angular/http";
import {DICTIONARIES_FOR_TEST, Dictionary} from "../model/dictionary";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";

@Injectable()
export class SearchService extends AbstractService {
    private searchUrl = 'http://localhost:8081/dictionary/search';

    constructor(private http: Http, private authService: AuthService) {
        super();
    }

    public search(text: string, searchType: string): Observable<Dictionary[]> {
        if (!this.authService.isLoggedIn()) {
            return this.searchInTestDictionaries(text, searchType);
        }
        let url: string = this.searchUrl;
        return this.http.get(url,
                {params: {searchType: searchType, searchText: text},
                    headers: this.authService.authorizationHeader()})
            .map(this.extractData)
            .catch(this.handleError);
    }

    private searchInTestDictionaries(text: string, searchType: string): Observable<Dictionary[]> {
        let dictionaries: Dictionary[] = Array.from(DICTIONARIES_FOR_TEST.values());
        let result: Dictionary[];
        if (searchType === 'name') {
            result = dictionaries.filter(dict => dict.name.indexOf(text) !== -1);
        } else {
            result = dictionaries.filter(dict => dict.tags.indexOf(text) !== -1);
        }
        return new Observable<Dictionary[]>(subscriber =>
            subscriber.next(result));
    }
}