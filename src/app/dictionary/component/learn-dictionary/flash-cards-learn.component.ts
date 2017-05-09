import { Component, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Dictionary } from '../../model/dictionary';
import { DictionaryEntry } from '../../model/dictionary-entry';
import { DictionaryService } from '../../service/dictionary.service';
import { PronounceService } from '../../service/pronounce.service';
import * as _ from 'lodash';

@Component({
    selector: 'flash-cards-learn',
    templateUrl: 'flash-cards-learn.component.html',
    styleUrls: ['flash-cards-learn.component.css']
})
export class FlashCardsLearnComponent implements OnChanges {
    @Input() dictionary: Dictionary;
    dictionaryEntries: DictionaryEntry[];
    word: string;
    translation: string;
    isWord: boolean;
    isTranslation: boolean;
    pairIndex: number;
    @Output() learningFinished = new EventEmitter();
    
    constructor(private dictionaryService: DictionaryService,
                private pronounceService: PronounceService,
                private route: ActivatedRoute) {}

    ngOnChanges() {
        this.dictionaryEntries = Array.from<DictionaryEntry>(this.dictionary.entries);
        this.initLearning();
    }

    translate(): void {
        this.isWord = false;
        this.isTranslation = true;
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

    pronounce(word: string): void {
        this.pronounceService.pronounce(word, this.dictionary.language);
    }
    
    private initWordAndTranslation(): void {
        this.word = this.dictionaryEntries[this.pairIndex].phrase;
        this.translation = this.dictionaryEntries[this.pairIndex].translation;
    }

    private showWord(): void {
        this.isWord = true;
        this.isTranslation = false;
    }
}