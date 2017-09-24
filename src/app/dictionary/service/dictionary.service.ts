import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import {DICTIONARIES_FOR_TEST, Dictionary} from "../model/dictionary";
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
        if (this.authService.isLoggedIn()) {
            return this.http.get(url,
                this.authService.authorizationHeaderAsObject())
                .map(this.extractData)
                .catch(this.handleError);
        } else {
            return new Observable<Dictionary[]>(subscriber =>
                subscriber.next(Array.from(DICTIONARIES_FOR_TEST.values())));
        }
    }

    public getDictionary(id: number | string): Observable<Dictionary> {
        if (this.authService.isLoggedIn()) {
            let url = this.dictionaryUrl + '/' + id;
            return this.http.get(url, this.authService.authorizationHeaderAsObject())
                .map(this.extractData).catch(this.handleError);
        } else {
            return new Observable<Dictionary>(subscriber =>
                subscriber.next(DICTIONARIES_FOR_TEST.get(id + '')));
        }
    }

    public saveDictionary(dictionary: Dictionary): Observable<Dictionary> {
        return this.http.post(this.dictionaryUrl, dictionary,
            this.authService.authorizationHeaderAsObject())
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    public updateDictionary(updatedDictionary: Dictionary,
                            newTags: string[],
                            removedTags: string[]): Observable<Dictionary> {
        let newTagsParam = newTags.join(",");
        let removedTagsParam = removedTags.join(",");
        return this.http.put(this.dictionaryUrl, updatedDictionary,
            {params: {newTags: newTagsParam, removedTags: removedTagsParam},
                headers: this.authService.authorizationHeader()})
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    public deleteDictionary(id: string) {
        let url = this.dictionaryUrl + '/' + id;
        return this.http.delete(url, this.authService.authorizationHeaderAsObject())
            .map(this.extractData).catch(this.handleError);
    }

    public extractNewDictionary(extractedDictionary: Dictionary,
                         oldDictionary: Dictionary): Observable<Dictionary> {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append("Authorization", this.authService.getToken());
        return this.http.post(this.dictionaryUrl + '/extract',
            JSON.stringify({
                extractedDictionary: extractedDictionary,
                oldDictionary: oldDictionary
            }),
            {headers: headers},
        ).map(this.extractData).catch(this.handleError);
    }

    public mergeDictionaries(dictionIdsToMerge: string[], name: string): Observable<Dictionary> {
        let ids = dictionIdsToMerge.join(',');
        let url = this.dictionaryUrl + '/merge?ids=' + ids + '&name=' + name;
        return this.http.put(url, {}, this.authService.authorizationHeaderAsObject())
            .map(this.extractData)
            .catch(this.handleError);
    }

    shareDictionaries(dictionIdsToShare: string[]): Observable<string> {
        let url = this.dictionaryUrl + '/share';
        return this.http.post(url, {},
            {
                params: {ids: dictionIdsToShare.join(",")},
                headers: this.authService.authorizationHeader()
            })
            .map(response => response.json()["token"])
            .catch(this.handleError);
    }

    receiveSharedDictionaries(sharedDictionariesToken: string): Observable<any> {
        let url = this.dictionaryUrl + '/receive-shared';
        return this.http.post(url, {},
            {
                params: { token: sharedDictionariesToken },
                headers: this.authService.authorizationHeader()
            })
            .map(response => {
                if (response.status !== 200) {
                    throw new Error("Receiving shared failed");
                }
            })
            .catch(this.handleError);
    }
}