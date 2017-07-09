import { Component, Input, OnInit } from '@angular/core';

import { Tabs } from './tabs.component';

@Component({
  selector: 'tab',
  templateUrl: 'tab.component.html',
  styleUrls: ['tab.component.css']
})
export class Tab implements OnInit {
  @Input() tabTitle: string;
  active: boolean = false;
  
  constructor(private tabs: Tabs) {}

  ngOnInit() {
    this.tabs.addTab(this)
  }
}