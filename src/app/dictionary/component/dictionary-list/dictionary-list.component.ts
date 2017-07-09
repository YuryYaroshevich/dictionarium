import { Component } from '@angular/core';

import { Dictionary } from '../../model/dictionary';
import { DictionaryService } from '../../service/dictionary.service';

@Component({
  selector: 'dictionary-list',
  styleUrls: [ 'dictionary-list.component.css' ],
  templateUrl: 'dictionary-list.component.html'
})
export class DictionaryListComponent {
  dictionaries: Dictionary[];
  errorMessage: String;
  constructor(private dictionaryService: DictionaryService) {}

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
