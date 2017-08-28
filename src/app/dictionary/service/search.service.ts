import {Injectable} from "@angular/core";
import {AbstractService} from "./abstract.service";
import {Http} from "@angular/http";
import {Dictionary} from "../model/dictionary";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SearchService extends AbstractService {
    private searchUrl = 'http://localhost:8081/dictionary/search';

    constructor(private http: Http) {
        super();
    }

    public search(text: string, searchType: string): Observable<Dictionary[]> {
        let url: string = this.searchUrl;
        return this.http.get(url,
                {params: {searchType: searchType, searchText: text}})
            .map(this.extractData)
            .catch(this.handleError);
    }
}