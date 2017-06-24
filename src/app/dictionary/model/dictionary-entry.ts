export class DictionaryEntry {
    isLinked: boolean = false;
    attachLinkToEntry = false;
    constructor(public phrase: string, public translation: string, public link: string) {}
}