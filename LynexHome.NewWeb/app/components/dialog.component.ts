import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'dialog',
    templateUrl: 'views/dialog.component.html',
    styleUrls: ['css/dialog.component.css'],
    moduleId: module.id
})
export class DialogComponent {
    private _header: string = null;
    private _content: string = null;

    @Output()
    close: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    set header(value: string) {
        this._header = value;
    }

    get currentSwitch(): string {
        return this._header;
    }

    @Input()
    set content(value: string) {
        this._content = value;
    }

    get content(): string {
        return this._content;
    }

    closeDialog(): void {
        this.close.emit('closed');
    }
}
