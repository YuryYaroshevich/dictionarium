import {Component, EventEmitter, HostListener, Input, OnChanges, Output} from "@angular/core";

import {ActiveLearnTabService} from "../../service/active-learn-tab.service";
import {DictionaryEntry} from "../../model/dictionary-entry";
import {Dictionary} from "../../model/dictionary";
import {AbstractLearnComponent} from "./abstract-learn.component";
import {PronounceService} from "../../service/pronounce.service";

import * as _ from 'lodash';

@Component({
    selector: 'dictation-learn',
    templateUrl: 'dictation-learn.component.html',
    styleUrls: ['dictation-learn.component.css']
})
export class DictationLearnComponent extends AbstractLearnComponent implements OnChanges {
    @Input() dictionary: Dictionary;
    dictionaryEntries: DictionaryEntry[];
    currentEntry: DictionaryEntry;
    pairIndex: number = 0;
    userInput: string;
    incorrectInput: boolean;
    hint: boolean = false;
    cheerUp: boolean;
    dictationStarted: boolean = false;
    @Output() learningFinished = new EventEmitter();

    constructor(activeLearnTabService: ActiveLearnTabService,
                private pronounceService: PronounceService,) {
        super(activeLearnTabService, "Dictation");
    }

    ngOnChanges() {
        this.dictionaryEntries = Array.from<DictionaryEntry>(this.dictionary.entries);
        this.initLearning();
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (this.isActiveTab()) {
            if (event.key === "Enter" && !this.dictationStarted) {
                this.startDictation();
            }
        }
    }

    initLearning(): void {
        this.dictionaryEntries = _.shuffle(this.dictionaryEntries);
        this.pairIndex = 0;
        this.currentEntry = this.dictionaryEntries[this.pairIndex];
    }

    pronounce() {
        this.pronounceService
            .pronounce(this.currentEntry.phrase, this.dictionary.language);
    }

    startDictation() {
        this.dictationStarted = true;
        this.pronounce();
    }

    check(): void {
        if (this.userInput) {
            this.hideMessageAboutMistake();
            if (this.userInput === this.currentEntry.phrase) {
                this.cheerUp = true;
                this.next();
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
            setTimeout(() => {
                this.cheerUp = false;
                this.pronounce();
            }, 1000)
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
        this.cheerUp = false;
    }

    showHint(): void {
        this.hint = true;
    }
}