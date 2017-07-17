import {ActiveLearnTabService} from "../../service/active-learn-tab.service";
import {DictionaryEntry} from "../../model/dictionary-entry";
import {Dictionary} from "../../model/dictionary";
import {AbstractLearnComponent} from "./abstract-learn.component";
import {PronounceService} from "../../service/pronounce.service";

import * as _ from 'lodash';
import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";

@Component({
    selector: 'clicker-learn',
    templateUrl: 'clicker-learn.component.html',
    styleUrls: ['clicker-learn.component.css']
})
export class ClickerLearnComponent extends AbstractLearnComponent implements OnChanges {
    @Input() dictionary: Dictionary;
    dictionaryEntries: DictionaryEntry[];
    currentEntry: DictionaryEntry;
    currentIndex: number;
    clickEntryRows: Array<ClickDictionaryEntry[]> = [];

    @Output() learningFinished = new EventEmitter();

    constructor(activeLearnTabService: ActiveLearnTabService,
                private pronounceService: PronounceService,) {
        super(activeLearnTabService, "Clicker");
    }

    ngOnChanges() {
        this.dictionaryEntries = Array.from<DictionaryEntry>(this.dictionary.entries);
        this.initLearning();
    }

    initLearning(): void {
        this.dictionaryEntries = _.shuffle(this.dictionaryEntries);
        this.currentIndex = 0;
        this.currentEntry = this.dictionaryEntries[this.currentIndex];

        let clickEntries = _.shuffle(this.initClickEntries(this.dictionaryEntries));
        let len = this.dictionaryEntries.length;
        let numberInRow = Math.ceil(Math.sqrt(len));
        let row = [];
        clickEntries.forEach((entry) => {
            row.push(entry);
            if (row.length === numberInRow) {
                this.clickEntryRows.push(row);
                row = [];
            }
        });
        if (row) {
            this.clickEntryRows.push(row);
        }
    }

    private initClickEntries(entries: DictionaryEntry[]): ClickDictionaryEntry[] {
        let dndEntries: ClickDictionaryEntry[] = [];
        entries.forEach(entry => {
            dndEntries.push(new ClickDictionaryEntry(entry.phrase,
                entry.translation, false, false));
        });
        return dndEntries;
    }

    check(clickedEntry: ClickDictionaryEntry): void {
        if (clickedEntry.phrase === this.currentEntry.phrase) {
            this.pronounceService.pronounce(
                clickedEntry.phrase, this.dictionary.language);
            clickedEntry.disappear = true;
            setTimeout(() => {
                this.next();
            }, 1000);
        } else {
            clickedEntry.error = true;
            setTimeout(() => {
                clickedEntry.error = false;
            }, 300);
        }
    }

    next(): void {
        this.currentIndex++;
        if (this.currentIndex < this.dictionaryEntries.length) {
            this.currentEntry = this.dictionaryEntries[this.currentIndex];
        } else {
            this.learningFinished.emit();
        }
    }
}

class ClickDictionaryEntry {
    constructor(public phrase: string, public translation: string,
                public disappear: boolean, public error: boolean) {}
}