import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Dictionary } from '../../model/dictionary';
import { DictionaryService } from '../../service/dictionary.service';
import {FlashCardsLearnComponent} from './flash-cards-learn.component';

@Component({
    selector: 'learn-dictionary.component',
    templateUrl: 'learn-dictionary.component.html',
    styleUrls: ['learn-dictionary.component.css']
})
export class LearnDictionaryComponent implements OnInit, OnDestroy {
    subscription: Subscription;

    dictionary: Dictionary;
    learningInProgress: boolean = true;

    constructor(private dictionaryService: DictionaryService,
                private route: ActivatedRoute) {}

    ngOnInit(): void {       
        this.subscription = this.route.params.subscribe((params:any) => {
            this.dictionaryService.getDictionary(params['id'])
                .subscribe(
                    dictionary => this.dictionary = dictionary,
                    error => console.log(error)
                );
        });
    }

    startNewLearning() {
        this.learningInProgress = true;
    }

    learningFinishedEvent() {
        this.learningInProgress = false;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}