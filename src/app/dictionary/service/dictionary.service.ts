import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Dictionary } from '../model/dictionary';

@Injectable()
export class DictionaryService {
    private dictionaryUrl = 'http://localhost:8081/dictionary';

    constructor(private http: Http) {}

    /*getDictionaries(): Observable<Dictionary[]> {
        return this.http.get(this.dictionaryUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }*/

    getDictionaries(ids?: string): Observable<Dictionary[]> {
        let url: string = this.dictionaryUrl;
        if (ids) {
            url += '?ids=' + ids;
        }
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getDictionary(id: number | string): Observable<Dictionary> {
        let url = this.dictionaryUrl + '/' + id;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    saveDictionary(dictionary: Dictionary): Observable<Dictionary> {
        return this.http.post(this.dictionaryUrl, dictionary)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    updateDictionary(updatedDictionary: Dictionary): Observable<Dictionary> {
        return this.http.put(this.dictionaryUrl, updatedDictionary)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    deleteDictionary(id: string) {
        let url = this.dictionaryUrl + '/' + id;
        return this.http.delete(url).map(this.extractData).catch(this.handleError);
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