import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Dictionary } from '../../model/dictionary';
import { DictionaryEntry } from '../../model/dictionary-entry';
import { DictionaryService } from '../../service/dictionary.service';
import { DictionaryForm } from '../new-dictionary/dictionary-form';

@Component({
    selector: 'dictionary',
    templateUrl: 'dictionary.component.html',
    styleUrls: ['dictionary.component.css']
})
export class DictionaryComponent extends DictionaryForm implements OnInit, OnDestroy {
    constructor(private dictionaryService: DictionaryService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
        super();
    }

    ngOnInit(): void {
        this.subscription = this.activatedRoute.params.subscribe(
            (params:any) => {
                this.dictionaryService.getDictionary(params['id'])
                    .subscribe(
                        dictionary => this.dictionary = dictionary,
                        error => console.log(error)
                    );
            });            
    }

    save() {
        this.dictionaryService.updateDictionary(this.dictionary)
            .subscribe(
                dictionary => this.ngOnInit(),//this.router.navigate(['dictionary', dictionary.id]),
                error => console.log(error)
            );
    }

    attachLink(entry: DictionaryEntry) {
        entry.attachLinkToEntry = true;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}