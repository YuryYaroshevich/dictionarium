import {Component, Input} from "@angular/core";
import {DictionaryEntry} from "../../model/dictionary-entry";
import {Dictionary} from "../../model/dictionary";

@Component({
    selector: 'matcher-learn',
    templateUrl: 'matcher-learn.component.html',
    styleUrls: ['matcher-learn.component.css']
})
export class MatcherLearnComponent {
    @Input() dictionary: Dictionary;
    dictionaryEntries: DictionaryEntry[];
    simpleDrop: any = null;
}