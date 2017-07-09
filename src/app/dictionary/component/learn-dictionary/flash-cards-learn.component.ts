import { Component, OnChanges, Input,
         EventEmitter, Output, HostListener } from '@angular/core';

import { Dictionary } from '../../model/dictionary';
import { DictionaryEntry } from '../../model/dictionary-entry';
import { PronounceService } from '../../service/pronounce.service';
import * as _ from 'lodash';
import { AbstractLearnComponent } from "./abstract-learn.component";
import {ActiveLearnTabService} from "../../service/active-learn-tab.service";


@Component({
    selector: 'flash-cards-learn',
    templateUrl: 'flash-cards-learn.component.html',
    styleUrls: ['flash-cards-learn.component.css']
})
export class FlashCardsLearnComponent extends AbstractLearnComponent implements OnChanges {
    @Input() dictionary: Dictionary;
    dictionaryEntries: DictionaryEntry[];
    word: string;
    translation: string;
    example: string;
    isWord: boolean;
    isTranslation: boolean;
    pairIndex: number;
    @Output() learningFinished = new EventEmitter();

    
    constructor(private pronounceService: PronounceService,
                activeLearnTabService: ActiveLearnTabService) {
        super(activeLearnTabService, "Flashcards");
    }

    ngOnChanges() {
        this.dictionaryEntries = Array.from<DictionaryEntry>(this.dictionary.entries);
        this.initLearning();
    }

    flip(): void {
        if (this.isWord) {
            this.pronounceService.pronounce(
                this.word, this.dictionary.language);
        }
        this.isWord = !this.isWord;
        this.isTranslation = !this.isTranslation;
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (this.isActiveTab()) {
            if (event.keyCode === 39) {
                this.next();
            }

            if (event.keyCode === 37) {
                this.previous();
            }

            if (event.key === "Enter") {
                this.flip();
            }
        }
    }

    next(): void {
        this.pairIndex++;
        if (this.pairIndex < this.dictionaryEntries.length) {
            this.showWord();
            this.initWordAndTranslation();
        } else {
            this.learningFinished.emit();
        }
    }

    previous(): void {
        if (this.pairIndex > 0) {
            this.pairIndex--;
            this.showWord();
            this.initWordAndTranslation();
        }
    }

    initLearning(): void {
        this.dictionaryEntries = _.shuffle(this.dictionaryEntries);
        this.pairIndex = 0;
        this.initWordAndTranslation();
        this.showWord();
    }
    
    private initWordAndTranslation(): void {
        let entry = this.dictionaryEntries[this.pairIndex];
        this.word = entry.phrase;
        this.translation = entry.translation;
        this.example = entry.example;
    }

    private showWord(): void {
        this.isWord = true;
        this.isTranslation = false;
    }
}