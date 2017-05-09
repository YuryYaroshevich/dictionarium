import { Subscription } from 'rxjs/Subscription';

import { Dictionary } from '../../model/dictionary';
import { DictionaryEntry } from '../../model/dictionary-entry';

export class DictionaryForm {
    subscription: Subscription;
    dictionary: Dictionary;
    
    addWord() {
        this.dictionary.entries.push(new DictionaryEntry('', ''))
    }
    
    removeWord(deletedEntry: DictionaryEntry) {
        this.dictionary.entries = this.dictionary.entries.filter(entry => entry.phrase !== deletedEntry.phrase);
    }
}