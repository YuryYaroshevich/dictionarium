import { Injectable } from '@angular/core';

@Injectable()
export class ActiveLearnTabService {
    activeTab: string;

    setActiveTab(tabName: string): void {
        this.activeTab = tabName;
    }

    isTabActive(tabName: string): boolean {
        return this.activeTab === tabName;
    }
}