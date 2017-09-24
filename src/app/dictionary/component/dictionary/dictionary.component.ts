import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { DictionaryEntry } from '../../model/dictionary-entry';
import { DictionaryService } from '../../service/dictionary.service';
import { DictionaryForm } from '../new-dictionary/dictionary-form';
import {Dictionary} from "../../model/dictionary";
import {TagService} from "../../service/tag.service";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../../service/auth.service";



@Component({
    selector: 'dictionary',
    templateUrl: 'dictionary.component.html',
    styleUrls: ['dictionary.component.css']
})
export class DictionaryComponent extends DictionaryForm implements OnInit, OnDestroy {
    extractModeOn: boolean = false;
    selectedForExtraction: DictionaryEntry[] = [];
    newDictionaryName: string;
    newTags: string[] = [];
    removedTags: string[] = [];
    autocompleteTags: string[] = [];
    tagsStr: string;

    constructor(private dictionaryService: DictionaryService,
                private tagService: TagService,
                private authService: AuthService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
        super();
    }

    ngOnInit(): void {
        this.removedTags = [];
        this.newTags = [];
        this.subscription = this.activatedRoute.params.subscribe(
            (params:any) => {
                this.dictionaryService.getDictionary(params['id'])
                    .subscribe(
                        dictionary => {
                            this.dictionary = dictionary;
                            this.tagsStr = dictionary.tags.join(" | ");
                        },
                        error => console.log(error)
                    );
            });
    }

    isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    save() {
        let tags: string[] = this.tagsStr.split(/ *\| */);
        this.removedTags = this.dictionary.tags.filter(tag => tags.indexOf(tag) === -1);
        this.newTags = tags.filter(tag => this.dictionary.tags.indexOf(tag) === -1);
        this.dictionary.tags = tags;
        this.dictionaryService.updateDictionary(this.dictionary,
                this.newTags, this.removedTags)
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
        this.dictionaryService
            .extractNewDictionary(extractedDictionary, this.dictionary)
            .subscribe(dictionary => {
                this.dictionary = dictionary;
                this.extractModeOn = false;
                console.log('Dictionary was extracted.');
            }, error => console.log(error));
    }

    extractModeOff() {
        this.extractModeOn = false;
    }

    onTagAdd(tag: any): void {
        this.newTags.push(tag.value);
    }

    onTagRemove(tag: string): void {
        this.removedTags.push(tag);
    }

    findTags(query: string): void {
        this.tagService.searchTags(query)
            .subscribe(tags => this.autocompleteTags = tags);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}