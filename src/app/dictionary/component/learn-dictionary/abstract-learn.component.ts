import { ActiveLearnTabService } from '../../service/active-learn-tab.service';

export class AbstractLearnComponent {
    tabTitle: string;

    constructor(private activeLearnTabService: ActiveLearnTabService,
                tabTitle:string) {
        this.tabTitle = tabTitle;
    }

    protected isActiveTab(): boolean {
        return this.activeLearnTabService.isTabActive(this.tabTitle);
    }
}