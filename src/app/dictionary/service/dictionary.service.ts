import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Dictionary } from '../model/dictionary';
import {AbstractService} from "./abstract.service";
import {AuthService} from "./auth.service";

@Injectable()
export class DictionaryService extends AbstractService {
    private dictionaryUrl = 'http://localhost:8081/dictionary';

    constructor(private http: Http, private authService: AuthService) {
        super();
    }

    public getDictionaries(ids?: string): Observable<Dictionary[]> {
        let url: string = this.dictionaryUrl;
        if (ids) {
            url += '?ids=' + ids;
        }
        let token = this.authService.getToken();
        let headers: Headers = new Headers({"Authorization": token});
        return this.http.get(url, {headers: headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getDictionary(id: number | string): Observable<Dictionary> {
        let url = this.dictionaryUrl + '/' + id;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    public saveDictionary(dictionary: Dictionary): Observable<Dictionary> {
        return this.http.post(this.dictionaryUrl, dictionary)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    public updateDictionary(updatedDictionary: Dictionary,
                            newTags: string[],
                            removedTags: string[]): Observable<Dictionary> {
        let newTagsParam = newTags.join(",");
        let removedTagsParam = removedTags.join(",");
        return this.http.put(this.dictionaryUrl, updatedDictionary,
            {params: {newTags: newTagsParam, removedTags: removedTagsParam}})
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    public deleteDictionary(id: string) {
        let url = this.dictionaryUrl + '/' + id;
        return this.http.delete(url).map(this.extractData).catch(this.handleError);
    }

    public extractNewDictionary(extractedDictionary: Dictionary,
                         oldDictionary: Dictionary): Observable<Dictionary> {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.dictionaryUrl + '/extract',
            JSON.stringify({
                extractedDictionary: extractedDictionary,
                oldDictionary: oldDictionary
            }),
            {headers: headers}
        ).map(this.extractData).catch(this.handleError);
    }

    public mergeDictionaries(dictionIdsToMerge: string[], name: string): Observable<Dictionary> {
        let ids = dictionIdsToMerge.join(',');
        let url = this.dictionaryUrl + '/merge?ids=' + ids + '&name=' + name;
        return this.http.put(url, {})
            .map(this.extractData)
            .catch(this.handleError);
    }
}