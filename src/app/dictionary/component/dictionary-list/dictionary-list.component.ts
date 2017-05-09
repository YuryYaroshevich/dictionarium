import { Component } from '@angular/core';
import { Params, Router } from '@angular/router';

import { Dictionary } from '../../model/dictionary';
import { DictionaryEntry } from '../../model/dictionary-entry';
import { DictionaryService } from '../../service/dictionary.service';

@Component({
  selector: 'dictionary-list',
  styleUrls: [ 'dictionary-list.component.css' ],
  templateUrl: 'dictionary-list.component.html'
})
export class DictionaryListComponent {
  dictionaries: Dictionary[];
  errorMessage: String;
  constructor(private dictionaryService: DictionaryService,
              private router: Router) {}

  ngOnInit():void {
    this.dictionaryService.getDictionaries()
      .subscribe(
                  dictionaries => this.dictionaries = dictionaries,
                  error =>  this.errorMessage = <any>error);
  }

  deleteDictionary(id: string) {
    this.dictionaryService.deleteDictionary(id)
            .subscribe( 
                () => this.ngOnInit(),
                error =>  console.log(error)
            );
  }
}
