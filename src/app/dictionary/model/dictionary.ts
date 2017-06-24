import { DictionaryEntry } from './dictionary-entry';

export class Dictionary {
    id: number;
    name: string;
    language: string;
    link: string;
    entries: Array<DictionaryEntry>;
 
    constructor(obj?: any) {    
        this.id = obj && obj.id || 0;
        this.name = obj && obj.name || "";
        this.language = obj && obj.language || "";
        this.link = obj && obj.link || "";
        this.entries = obj && obj.entries || [];
    }
}