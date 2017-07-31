import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Dictionary } from '../model/dictionary';

@Injectable()
export class DictionaryService {
    private dictionaryUrl = 'http://localhost:8081/dictionary';

    constructor(private http: Http) {}

    public getDictionaries(ids?: string): Observable<Dictionary[]> {
        let url: string = this.dictionaryUrl;
        if (ids) {
            url += '?ids=' + ids;
        }
        return this.http.get(url)
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

    public updateDictionary(updatedDictionary: Dictionary): Observable<Dictionary> {
        return this.http.put(this.dictionaryUrl, updatedDictionary)
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

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}