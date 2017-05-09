import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Dictionary } from '../../model/dictionary';
import { DictionaryEntry } from '../../model/dictionary-entry';
import { DictionaryService } from '../../service/dictionary.service';
import { DictionaryForm } from './dictionary-form';

@Component({
    selector: 'create-dictionary',
    templateUrl: 'create-dictionary.component.html',
    styleUrls: ['create-dictionary.component.css']
})
export class CreateDictionaryComponent extends DictionaryForm implements OnInit {
    dictionary: Dictionary;

    constructor(private dictionaryService: DictionaryService,
                private router: Router) {
        super();
    }

    ngOnInit() {
        this.dictionary = new Dictionary();
    }

    create() {
        this.dictionaryService.saveDictionary(this.dictionary)
            .subscribe( 
                dictionary => this.router.navigate(['dictionary', dictionary.id]),
                error =>  console.log(error)
            );
    }
}