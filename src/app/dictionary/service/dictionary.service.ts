import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Dictionary } from '../model/dictionary';
import { DictionaryEntry } from '../model/dictionary-entry';

const dictionaries: Dictionary[] = [
    new Dictionary({id: 1, name: 'sport', language: 'en-gb', 
        entries: [new DictionaryEntry('football', 'футбол'), new DictionaryEntry('ball', 'мяч')]}),
    new Dictionary({id: 2, name: 'food', language: 'en-gb',
        entries: [new DictionaryEntry('bread', 'хлеб'), new DictionaryEntry('sweet', 'конфета')]}),
    new Dictionary({id: 3, name: 'art', language: 'en-gb',
        entries: [new DictionaryEntry('picture', 'картина'), new DictionaryEntry('painter', 'художник')]})
];

//let dictionariesPromise = Promise.resolve(dictionaries);

@Injectable()
export class DictionaryService {
    private dictionaryUrl = 'http://localhost:8081/dictionary';

    constructor(private http: Http) {}

    getDictionaries(): Observable<Dictionary[]> {
        return this.http.get(this.dictionaryUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getDictionary(id: number | string): Observable<Dictionary> {
        let url = this.dictionaryUrl + '/' + id;
        return this.http.get(url).map(this.extractData).catch(this.handleError);
    }

    saveDictionary(dictionary: Dictionary): Observable<Dictionary> {
        //dictionary.id = Math.random();
        //dictionaries.push(dictionary);
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