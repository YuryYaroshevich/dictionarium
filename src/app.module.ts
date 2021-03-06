import { NgModule } from "@angular/core";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {ROUTING} from "./app.routing";
import {MyApp} from "./app/app";
import {DictionaryListComponent} from "./app/dictionary/component/dictionary-list/dictionary-list.component";
import {DictionaryComponent} from "./app/dictionary/component/dictionary/dictionary.component";
import {LearnDictionaryComponent} from "./app/dictionary/component/learn-dictionary/learn-dictionary.component";
import {FlashCardsLearnComponent} from "./app/dictionary/component/learn-dictionary/flash-cards-learn.component";
import {FlashCardsWritingComponent} from "./app/dictionary/component/learn-dictionary/flash-cards-writing.component";
import {RepeatLearningComponent} from "./app/dictionary/component/learn-dictionary/repeat-learning.component";
import {Tabs} from "./app/dictionary/component/learn-dictionary/tabs.component";
import {Tab} from "./app/dictionary/component/learn-dictionary/tab.component";
import {CreateDictionaryComponent} from "./app/dictionary/component/new-dictionary/create-dictionary.component";
import {EditDictionaryComponent} from "./app/dictionary/component/new-dictionary/edit-dictionary.component";
import {WordTranslationComponent} from "./app/dictionary/component/new-dictionary/word-translation.component";
import {DictionaryService} from "./app/dictionary/service/dictionary.service";
import {PronounceService} from "./app/dictionary/service/pronounce.service";
import {ActiveLearnTabService} from "./app/dictionary/service/active-learn-tab.service";
import {DictationLearnComponent} from "./app/dictionary/component/learn-dictionary/dictation-learn.component";
import {DndModule} from "ng2-dnd";
import {MatcherLearnComponent} from "./app/dictionary/component/learn-dictionary/matcher-learn.component";
import {ClickerLearnComponent} from "./app/dictionary/component/learn-dictionary/clicker-learn.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TagService} from "./app/dictionary/service/tag.service";
import {CommonModule} from "@angular/common";
import {Ng2DropdownModule} from "ng2-material-dropdown";
import {RlTagInputModule} from 'angular2-tag-input';
import {SearchService} from "./app/dictionary/service/search.service";
import {LoginComponent} from "./app/dictionary/component/authorization/login.component";
import {AuthService} from "./app/dictionary/service/auth.service";
import {SharedDictionariesComponent} from "./app/dictionary/component/shared/shared-dictionaries.component";


@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule, ROUTING, DndModule.forRoot(),
      BrowserAnimationsModule, CommonModule, ReactiveFormsModule, Ng2DropdownModule, RlTagInputModule],
  declarations: [ MyApp, DictionaryListComponent,
                  DictionaryComponent, LearnDictionaryComponent, FlashCardsLearnComponent,
                  FlashCardsWritingComponent, CreateDictionaryComponent,
                  EditDictionaryComponent, WordTranslationComponent, Tabs, Tab,
                  RepeatLearningComponent, DictationLearnComponent, MatcherLearnComponent,
                  ClickerLearnComponent, LoginComponent, SharedDictionariesComponent],
  bootstrap: [ MyApp ],
  providers: [DictionaryService, PronounceService, ActiveLearnTabService,
      TagService, SearchService, AuthService]
})
export class AppModule {}
