import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {DictionaryListComponent} from "./app/dictionary/component/dictionary-list/dictionary-list.component";
import {DictionaryComponent} from "./app/dictionary/component/dictionary/dictionary.component";
import {LearnDictionaryComponent} from "./app/dictionary/component/learn-dictionary/learn-dictionary.component";
import {CreateDictionaryComponent} from "./app/dictionary/component/new-dictionary/create-dictionary.component";
import {EditDictionaryComponent} from "./app/dictionary/component/new-dictionary/edit-dictionary.component";
import {LoginComponent} from "./app/dictionary/component/authorization/login.component";
import {SharedDictionariesComponent} from "./app/dictionary/component/shared/shared-dictionaries.component";

export const ROUTES: Routes = [
  { path: 'dictionary', component: DictionaryListComponent},
  { path: 'dictionary/learn', component: LearnDictionaryComponent},
  { path: 'dictionary/:id', component: DictionaryComponent},
  { path: 'dictionary/:id/learn', component: LearnDictionaryComponent},
  { path: 'dictionary/:id/edit', component: EditDictionaryComponent},
  { path: 'create-dictionary', component: CreateDictionaryComponent},
  { path: 'login', component: LoginComponent},
  { path: 'receive-shared', component: SharedDictionariesComponent},
  { path: '', redirectTo: 'dictionary', pathMatch: 'full' },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
