import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
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

@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule, ROUTING, DndModule.forRoot() ],
  declarations: [ MyApp, DictionaryListComponent,
                  DictionaryComponent, LearnDictionaryComponent, FlashCardsLearnComponent,
                  FlashCardsWritingComponent, CreateDictionaryComponent,
                  EditDictionaryComponent, WordTranslationComponent, Tabs, Tab,
                  RepeatLearningComponent, DictationLearnComponent, MatcherLearnComponent,
                  ClickerLearnComponent],
  bootstrap: [ MyApp ],
  providers: [DictionaryService, PronounceService, ActiveLearnTabService]
})
export class AppModule {}
