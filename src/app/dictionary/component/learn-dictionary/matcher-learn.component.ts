import {Component, Input, OnChanges, EventEmitter, Output} from "@angular/core";
import {DictionaryEntry} from "../../model/dictionary-entry";
import {Dictionary} from "../../model/dictionary";
import {AbstractLearnComponent} from "./abstract-learn.component";

import * as _ from 'lodash';


@Component({
    selector: 'matcher-learn',
    templateUrl: 'matcher-learn.component.html',
    styleUrls: ['matcher-learn.component.css']
})
export class MatcherLearnComponent extends AbstractLearnComponent implements OnChanges {
    @Input() dictionary: Dictionary;
    dictionaryEntriesLeft: DndDictionaryEntry[];
    dictionaryEntriesRight: DndDictionaryEntry[];

    @Output() learningFinished = new EventEmitter();

    ngOnChanges() {
        this.dictionaryEntriesLeft = this.initDictionaryEntries(this.dictionary.entries);
        this.dictionaryEntriesRight = this.initDictionaryEntries(this.dictionary.entries);
        this.initLearning();
    }

    private initDictionaryEntries(entries: DictionaryEntry[]): DndDictionaryEntry[] {
        let dndEntries: DndDictionaryEntry[] = [];
        entries.forEach(entry => {
            dndEntries.push(new DndDictionaryEntry(entry.phrase, entry.translation, false));
        });
        return dndEntries;
    }

    initLearning(): void {
        this.dictionaryEntriesLeft = _.shuffle(this.dictionaryEntriesLeft);
        this.dictionaryEntriesRight = _.shuffle(this.dictionaryEntriesRight);
    }

    isValid(rightEntry: DndDictionaryEntry): any {
        return (leftEntry: DndDictionaryEntry) => {
            if (leftEntry.phrase === rightEntry.phrase) {
                rightEntry.disappear = true;
                leftEntry.disappear = true;
                if (this.isFinished()) {
                    this.learningFinished.emit();
                }
                return true;
            }
            return false;
        };
    }

    private isFinished(): boolean {
        return this.dictionaryEntriesRight
                .filter((entry) => entry.disappear).length === this.dictionaryEntriesRight.length
    }
}

class DndDictionaryEntry {
    constructor(public phrase: string, public translation: string,
                public disappear: boolean) {}
}