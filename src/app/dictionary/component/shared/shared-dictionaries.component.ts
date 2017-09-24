import {Component} from "@angular/core";
import {DictionaryService} from "../../service/dictionary.service";
import {Router} from "@angular/router";


@Component({
    selector: 'shared-dictionaries',
    styleUrls: [ 'shared-dictionaries.component.css' ],
    templateUrl: 'shared-dictionaries.component.html'
})
export class SharedDictionariesComponent {
    sharedDictionariesToken: string;

    constructor(private dictionaryService: DictionaryService,
                private router: Router) {}

    submitToken() {
        this.dictionaryService
            .receiveSharedDictionaries(this.sharedDictionariesToken)
            .subscribe(
                () =>  this.router.navigate(['/dictionary']),
                error =>  console.log(error));
    }
}