import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as _ from 'lodash';

import { Dictionary } from '../../model/dictionary';
import { DictionaryService } from '../../service/dictionary.service';
import {SearchService} from "../../service/search.service";
import {AuthService} from "../../service/auth.service";


@Component({
  selector: 'dictionary-list',
  styleUrls: [ 'dictionary-list.component.css' ],
  templateUrl: 'dictionary-list.component.html'
})
export class DictionaryListComponent implements OnInit{
  dictionaries: Dictionary[];
  dictionIdsToLearn: string[] = [];
  dictionIdsToMerge: string[] = [];
  dictionIdsToShare: string[] = [];
  sharedDictionariesToken: string;
  newDictionaryName: string;
  errorMessage: String;
  selectForLearnMode: boolean = false;
  selectForMergeMode: boolean = false;
  selectForShareMode: boolean = false;
  searchText: string;
  selectedSearchType: string = 'tag';
  searchTypes: string[] = ['tag', 'name'];
  searchDropdownShow: boolean = false;
  searchMode: boolean = false;

  constructor(private dictionaryService: DictionaryService,
              private searchService: SearchService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit():void {
    this.dictionaryService.getDictionaries()
      .subscribe(
                  dictionaries => this.dictionaries = dictionaries,
                  error =>  this.errorMessage = <any>error);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  deleteDictionary(id: string) {
    this.dictionaryService.deleteDictionary(id)
            .subscribe( 
                () => this.ngOnInit(),
                error => console.log(error)
            );
  }

  selectForLearn() {
    this.selectForLearnMode = true;
    this.selectForMergeMode = false;
    this.selectForShareMode = false;
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

  cancelLearnMode() {
    this.dictionIdsToLearn = [];
    this.selectForLearnMode = false;
  }

  selectForMerge() {
    this.selectForMergeMode = true;
    this.selectForLearnMode = false;
    this.selectForShareMode = false;
  }

  onMergeCheckboxClick(dictionaryId: string, isChecked: boolean): void {
    if (isChecked) {
      this.dictionIdsToMerge.push(dictionaryId);
    } else {
      _.remove(this.dictionIdsToMerge, dict => dict.id === dictionaryId);
    }
  }

  cancelMergeMode() {
    this.newDictionaryName = '';
    this.dictionIdsToMerge = [];
    this.selectForMergeMode = false;
  }

  mergeDictionaries() {
    this.dictionaryService
        .mergeDictionaries(this.dictionIdsToMerge, this.newDictionaryName)
        .subscribe(
            () => {
              this.ngOnInit();
              this.cancelMergeMode();
            },
            error =>  console.log(error));
  }

  selectForShare() {
    this.selectForMergeMode = false;
    this.selectForLearnMode = false;
    this.selectForShareMode = true;
  }

  onShareCheckboxClick(dictionaryId: string, isChecked: boolean): void {
    if (isChecked) {
      this.dictionIdsToShare.push(dictionaryId);
    } else {
      _.remove(this.dictionIdsToShare, dict => dict.id === dictionaryId);
    }
  }

  cancelShareMode() {
    this.dictionIdsToShare = [];
    this.selectForShareMode = false;
  }

  shareDictionaries() {
    this.dictionaryService
        .shareDictionaries(this.dictionIdsToShare)
        .subscribe(
            sharedDictionariesToken =>
                this.sharedDictionariesToken = sharedDictionariesToken,
            error =>  console.log(error));
  }

  selectSearchType(searchType: any) {
    this.selectedSearchType = searchType;
    this.searchDropdownToggle();
  }

  searchDropdownToggle() {
    this.searchDropdownShow = !this.searchDropdownShow;
  }

  search() {
    this.searchMode = true;
    this.searchService.search(this.searchText, this.selectedSearchType)
        .subscribe(
            dictionaries => this.dictionaries = dictionaries,
            error =>  this.errorMessage = <any>error
        )
  }

  switchOfSearchMode() {
    this.searchMode = false;
    this.searchText = '';
    this.ngOnInit();
  }
}
