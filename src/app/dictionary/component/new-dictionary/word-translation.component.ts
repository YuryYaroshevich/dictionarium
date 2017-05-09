import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DictionaryEntry } from '../../model/dictionary-entry';

@Component({
    selector: 'word-translation',
    templateUrl: 'word-translation.component.html'
})
export class WordTranslationComponent {
    @Input() dictionaryEntry: DictionaryEntry;
    @Output() onRemoveWord = new EventEmitter();

    removeWord() {
        this.onRemoveWord.emit(this.dictionaryEntry);
    }
}