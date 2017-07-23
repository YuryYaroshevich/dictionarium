import {Component, OnInit} from '@angular/core';

import { Dictionary } from '../../model/dictionary';
import { DictionaryService } from '../../service/dictionary.service';
import {Router} from "@angular/router";

@Component({
  selector: 'dictionary-list',
  styleUrls: [ 'dictionary-list.component.css' ],
  templateUrl: 'dictionary-list.component.html'
})
export class DictionaryListComponent implements OnInit{
  dictionaries: Dictionary[];
  dictionIdsToLearn: string[] = [];
  errorMessage: String;
  selectForLearnMode: boolean = false;

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

  selectForLearn() {
    this.selectForLearnMode = true;
  }

  onLearnCheckboxClick(dictionaryId: string, isChecked: boolean): void {
    if (isChecked) {
      this.dictionIdsToLearn.push(dictionaryId);
    } else {
      this.dictionIdsToLearn = this.dictionIdsToLearn
          .filter(id => id !== dictionaryId);
    }
  }

  learn(): void {
    let ids = this.dictionIdsToLearn.join(',');
    this.router.navigate(['dictionary/learn'], {"queryParams": {ids: ids}});
  }
}
