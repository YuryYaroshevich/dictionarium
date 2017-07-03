export class DictionaryEntry {
    hasExample: boolean = false;
    addExampleToEntry = false;
    constructor(public phrase: string, public translation: string, public example: string) {}
}