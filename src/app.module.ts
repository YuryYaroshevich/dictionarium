import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ROUTING } from './app.routing';
import { MyApp } from './app/app';
import { DictionaryListComponent } from './app/dictionary/component/dictionary-list/dictionary-list.component';
import { DictionaryComponent } from './app/dictionary/component/dictionary/dictionary.component';
import { LearnDictionaryComponent } from './app/dictionary/component/learn-dictionary/learn-dictionary.component';
import { FlashCardsLearnComponent } from './app/dictionary/component/learn-dictionary/flash-cards-learn.component';
import { RepeatLearningComponent } from './app/dictionary/component/learn-dictionary/repeat-learning.component';
import { Tabs } from './app/dictionary/component/learn-dictionary/tabs.component';
import { Tab } from './app/dictionary/component/learn-dictionary/tab.component';
import { CreateDictionaryComponent } from './app/dictionary/component/new-dictionary/create-dictionary.component';
import { EditDictionaryComponent } from './app/dictionary/component/new-dictionary/edit-dictionary.component';
import { WordTranslationComponent } from './app/dictionary/component/new-dictionary/word-translation.component';
import { DictionaryService } from './app/dictionary/service/dictionary.service';
import { PronounceService } from './app/dictionary/service/pronounce.service';

@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule, ROUTING ],
  declarations: [ MyApp, DictionaryListComponent, 
                  DictionaryComponent, LearnDictionaryComponent, FlashCardsLearnComponent, 
                  CreateDictionaryComponent, EditDictionaryComponent,
                  WordTranslationComponent, Tabs, Tab, RepeatLearningComponent],
  bootstrap: [ MyApp ],
  providers: [DictionaryService, PronounceService]
})
export class AppModule {}
