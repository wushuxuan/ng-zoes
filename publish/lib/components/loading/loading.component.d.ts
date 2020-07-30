import { OnInit, SimpleChanges } from '@angular/core';
import { AZLoadingType, AZLoadingSize } from './loading.interface';
export declare class LoadingComponent implements OnInit {
    type?: AZLoadingType;
    loading?: boolean;
    color?: string;
    size?: AZLoadingSize;
    className: AZLoadingType;
    loadList: any;
    _size: number;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    _getSize(size: any): void;
    _getLoader(type: any): void;
}
