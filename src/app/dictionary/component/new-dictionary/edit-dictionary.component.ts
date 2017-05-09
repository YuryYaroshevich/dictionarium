import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Dictionary } from '../../model/dictionary';
import { DictionaryEntry } from '../../model/dictionary-entry';
import { DictionaryService } from '../../service/dictionary.service';
import { DictionaryForm } from './dictionary-form';

@Component({
    selector: 'edit-dictionary',
    templateUrl: 'create-dictionary.component.html',
    styleUrls: ['create-dictionary.component.css']
})
export class EditDictionaryComponent extends DictionaryForm implements OnInit, OnDestroy {
    dictionary: Dictionary;

    constructor(private dictionaryService: DictionaryService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params:any) => {
            this.dictionaryService.getDictionary(params['id'])
                .subscribe(
                    dictionary => this.dictionary = dictionary,
                    error => console.log(error)
                );
        });
    }

    create() {
        this.dictionaryService.updateDictionary(this.dictionary)
            .subscribe(
                dictionary => this.router.navigate(['dictionary', dictionary.id]),
                error => console.log(error)
            );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}