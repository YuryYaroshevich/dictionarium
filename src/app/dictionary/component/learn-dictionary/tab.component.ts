import { Component, Input } from '@angular/core';

import { Tabs } from './tabs.component';

@Component({
  selector: 'tab',
  templateUrl: 'tab.component.html',
  styleUrls: ['tab.component.css']
})
export class Tab {
  @Input() tabTitle: string;
  active: boolean = false;
  
  constructor(tabs: Tabs) {
    tabs.addTab(this)
  }
}