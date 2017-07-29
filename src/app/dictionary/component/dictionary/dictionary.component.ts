import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

import { DictionaryEntry } from '../../model/dictionary-entry';
import { DictionaryService } from '../../service/dictionary.service';
import { DictionaryForm } from '../new-dictionary/dictionary-form';
import {Dictionary} from "../../model/dictionary";


@Component({
    selector: 'dictionary',
    templateUrl: 'dictionary.component.html',
    styleUrls: ['dictionary.component.css']
})
export class DictionaryComponent extends DictionaryForm implements OnInit, OnDestroy {
    extractModeOn: boolean = false;
    selectedForExtraction: DictionaryEntry[] = [];
    newDictionaryName: string;

    constructor(private dictionaryService: DictionaryService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
        super();
    }

    ngOnInit(): void {
        this.subscription = this.activatedRoute.params.subscribe(
            (params:any) => {
                this.dictionaryService.getDictionary(params['id'])
                    .subscribe(
                        dictionary => this.dictionary = dictionary,
                        error => console.log(error)
                    );
            });            
    }

    save() {
        this.dictionaryService.updateDictionary(this.dictionary)
            .subscribe(
                dictionary => this.ngOnInit(),
                error => console.log(error)
            );
    }

    addExample(entry: DictionaryEntry) {
        entry.addExampleToEntry = true;
    }

    extractMode(): void {
        this.extractModeOn = true;
    }

    onExtractCheckboxClick(selectedEntry: DictionaryEntry, isChecked: boolean): void {
        if (isChecked) {
            this.selectedForExtraction.push(selectedEntry);
        } else {
            this.selectedForExtraction = this.selectedForExtraction
                .filter(entry => entry.phrase !== selectedEntry.phrase);
        }
    }

    extractNewDictionary() {
        let extractedDictionary: Dictionary = new Dictionary({
            name: this.newDictionaryName,
            language: this.dictionary.language,
            entries: this.selectedForExtraction
        });
        extractedDictionary.entries.forEach(entry => _.remove(this.dictionary.entries, entry));
        //_.remove(this.dictionary.entries, extractedDictionary.entries);
        this.dictionaryService
            .extractNewDictionary(extractedDictionary, this.dictionary)
            .subscribe(dictionary => {
                this.dictionary = dictionary;
                this.extractModeOn = false;
                console.log('Dictionary was extracted.');
            }, error => console.log(error));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}