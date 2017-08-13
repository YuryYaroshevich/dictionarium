import {Injectable} from "@angular/core";
import {AbstractService} from "./abstract.service";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";

@Injectable()
export class TagService extends AbstractService {
    private tagUrl = 'http://localhost:8081/tag';

    constructor(private http: Http) {
        super();
    }

    public searchTags(query: string): Observable<string[]> {
        return this.http.get(this.tagUrl, {params: {query: query}})
            .map(this.extractData)
            .catch(this.handleError);
    }
}