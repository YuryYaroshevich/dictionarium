import {Component, EventEmitter, Output} from '@angular/core';

import { Tab } from './tab.component';
import { ActiveLearnTabService } from '../../service/active-learn-tab.service';

@Component({
    selector: 'tabs',
    templateUrl: 'tabs.component.html'
})
export class Tabs {
    tabs: Tab[] = [];
    @Output() onTabSelection = new EventEmitter();

    constructor(private activeLearnTabService: ActiveLearnTabService) {}

    addTab(tab:Tab) {
        if (this.tabs.length === 0) {
            tab.active = true;
            this.activeLearnTabService.setActiveTab(tab.tabTitle);
        }
        this.tabs.push(tab);
    }

    selectTab(tab:Tab) {
        this.tabs.forEach((tab) => {
            tab.active = false;
        });
        tab.active = true
        this.activeLearnTabService.setActiveTab(tab.tabTitle);
        this.onTabSelection.emit()
    }
}