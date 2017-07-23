import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import * as _ from 'lodash';

import {Dictionary} from "../../model/dictionary";
import {DictionaryService} from "../../service/dictionary.service";
import {DictionaryEntry} from "../../model/dictionary-entry";

@Component({
    selector: 'learn-dictionary.component',
    templateUrl: 'learn-dictionary.component.html',
    styleUrls: ['learn-dictionary.component.css']
})
export class LearnDictionaryComponent implements OnInit, OnDestroy {
    idSubscription: Subscription;
    idsSubscription: Subscription;

    dictionary: Dictionary;
    combinedDictionaryMode: boolean = false;
    learningInProgress: boolean = true;

    constructor(private dictionaryService: DictionaryService,
                private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.idSubscription = this.route.params.subscribe((params:any) => {
            if (params['id']) {
                this.dictionaryService.getDictionary(params['id'])
                    .subscribe(
                        dictionary => this.dictionary = dictionary,
                        error => console.log(error)
                    );
            }
        });

        this.idsSubscription = this.route.queryParams.subscribe((params:any) => {
            if (params['ids']) {
                this.dictionaryService.getDictionaries(params['ids'])
                    .subscribe(
                        dictionaries => {
                            let entries: DictionaryEntry[] = [];
                            dictionaries.forEach(dict =>
                                entries = entries.concat(dict.entries));
                            entries = _.shuffle(entries);
                            this.dictionary = new Dictionary({
                                language: dictionaries[0].language, entries: entries});
                            this.combinedDictionaryMode = true;
                        },
                        error => console.log(error)
                    );
            }
        });
    }

    startNewLearning() {
        this.learningInProgress = true;
    }

    learningFinishedEvent() {
        this.learningInProgress = false;
    }

    ngOnDestroy() {
        this.idSubscription.unsubscribe();
        this.idsSubscription.unsubscribe();
    }
}