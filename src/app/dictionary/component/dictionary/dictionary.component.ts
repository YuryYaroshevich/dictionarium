import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Dictionary } from '../../model/dictionary';
import { DictionaryService } from '../../service/dictionary.service';

@Component({
    selector: 'dictionary',
    templateUrl: 'dictionary.component.html',
    styleUrls: ['dictionary.component.css']
})
export class DictionaryComponent implements OnInit, OnDestroy {
    subscription: Subscription;

    dictionary: Dictionary;

    constructor(private dictionaryService: DictionaryService,
                private activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.subscription = this.activatedRoute.params.subscribe(
            (params:any) => {
                this.dictionaryService.getDictionary(params['id'])
                    .subscribe(
                        dictionary => {
                            this.dictionary = dictionary
                        },
                        error => console.log(error)
                    );
            });            
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}