import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';

import { Dictionary } from '../../model/dictionary';
import { DictionaryEntry } from '../../model/dictionary-entry';

import { PronounceService } from '../../service/pronounce.service';

import * as _ from 'lodash';

@Component({
    selector: 'flash-cards-writing',
    templateUrl: 'flash-cards-writing.component.html',
    styleUrls: ['flash-cards-writing.component.css']
})
export class FlashCardsWritingComponent implements OnChanges {
    @Input() dictionary: Dictionary;
    dictionaryEntries: DictionaryEntry[];
    currentEntry: DictionaryEntry;
    pairIndex: number = 0;
    userInput: string;
    incorrectInput: boolean;
    hint: boolean = false;

    @Output() learningFinished = new EventEmitter();

    constructor(private pronounceService: PronounceService) {}

    ngOnChanges() {
        this.dictionaryEntries = Array.from<DictionaryEntry>(this.dictionary.entries);
        this.initLearning();
    }

    initLearning(): void {
        this.dictionaryEntries = _.shuffle(this.dictionaryEntries);
        this.pairIndex = 0;
        this.currentEntry = this.dictionaryEntries[this.pairIndex];
    }

    check(): void {
        if (this.userInput) {
            this.hideMessageAboutMistake();
            if (this.userInput === this.currentEntry.phrase) {
                this.pronounceService.pronounce(
                    this.userInput, this.dictionary.language);
                setTimeout(() => {
                    this.next();
                }, 1000);
            } else {
                this.inputIncorrect();
            }
        }
    }

    next(): void {
        this.pairIndex++;
        this.userInput = '';
        if (this.pairIndex < this.dictionaryEntries.length) {
            this.currentEntry = this.dictionaryEntries[this.pairIndex];
        } else {
            this.learningFinished.emit()
        }
    }

    inputIncorrect(): void {
        this.incorrectInput = true;
    }

    hideMessageAboutMistake(): void {
        this.incorrectInput = false;
        this.hint = false;
    }

    showHint(): void {
        this.hint = true;
    }
}