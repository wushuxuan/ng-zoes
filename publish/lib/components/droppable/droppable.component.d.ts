import { OnInit, TemplateRef, SimpleChanges } from '@angular/core';
export declare class DroppableComponent implements OnInit {
    data: any[];
    renderItem: TemplateRef<void>;
    disabled: boolean;
    private zdSortChange;
    options: any;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    _disabledChange(value: any): void;
    _setOption(value: any): void;
}
