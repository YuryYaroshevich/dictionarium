import { DictionaryEntry } from './dictionary-entry';

export class Dictionary {
    id: number;
    name: string;
    language: string;
    entries: Array<DictionaryEntry>;
 
    constructor(obj?: any) {    
        this.id = obj && obj.id || 0;
        this.name = obj && obj.name || "";
        this.language = obj && obj.language || "";
        this.entries = obj && obj.entries || [];
    }
}