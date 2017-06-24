import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DictionaryEntry } from '../../model/dictionary-entry';

@Component({
    selector: 'word-translation',
    templateUrl: 'word-translation.component.html',
    styleUrls: ['word-translation.component.css']
})
export class WordTranslationComponent {
    @Input() dictionaryEntry: DictionaryEntry;
    @Output() onRemoveWord = new EventEmitter();

    removeWord() {
        this.onRemoveWord.emit(this.dictionaryEntry);
    }

    addLink() {
        this.dictionaryEntry.isLinked = true;
    }
}