import { DictionaryEntry } from './dictionary-entry';

export class Dictionary {
    id: string;
    name: string;
    language: string;
    entries: Array<DictionaryEntry>;
    tags: string[];
 
    constructor(obj?: any) {    
        this.id = obj && obj.id || "";
        this.name = obj && obj.name || "";
        this.language = obj && obj.language || "";
        this.entries = obj && obj.entries || [];
        this.tags = obj && obj.tags || [];
    }
}

export const DICTIONARIES_IDS_FOR_TEST = ['testId-1', 'testId-2'];

export const DICTIONARIES_FOR_TEST: Map<string, Dictionary> = new Map();
DICTIONARIES_FOR_TEST.set(DICTIONARIES_IDS_FOR_TEST[0], new Dictionary({
    id: 'testId-1',
    name: 'sport',
    language: 'en-gb',
    entries: [
        new DictionaryEntry('ball', 'мяч', 'For playing football we need a ball.'),
        new DictionaryEntry('coach', 'тренер', 'My coach is strict.'),
        new DictionaryEntry('health', 'здоровье', 'Sport is good for your health.'),
    ],
    tags: ['health', 'exercise']
}));
DICTIONARIES_FOR_TEST.set(DICTIONARIES_IDS_FOR_TEST[1], new Dictionary({
    id: 'testId-2',
    name: 'art',
    language: 'en-gb',
    entries: [
        new DictionaryEntry('painter', 'художник', 'Vincent van Gogh is my favourite painter.'),
        new DictionaryEntry('exhibition', 'выставка', 'Contemporary art exhibition will be arranged soon.'),
        new DictionaryEntry('sculpture', 'скульптура', 'This sculpture was made long time ago.'),
    ],
    tags: ['inspiration', 'culture']
}));
