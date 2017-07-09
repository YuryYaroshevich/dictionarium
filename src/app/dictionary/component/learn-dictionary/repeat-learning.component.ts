import { Component, HostListener, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'repeat-learning',
    templateUrl:"repeat-learning.component.html",
    styleUrls: ["repeat-learning.component.css"]
})
export class RepeatLearningComponent {
    @Output() startNewLearning = new EventEmitter();

    newLearning() {
        this.startNewLearning.emit();
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.newLearning();
        }
    }
}