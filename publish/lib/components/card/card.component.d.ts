import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZCOptions } from './card.interface';
export declare class CardComponent implements OnInit {
    private router;
    options: ZCOptions;
    loading: boolean;
    _selectedIndex: number;
    constructor(router: Router);
    ngOnInit(): void;
    _getExtraLink(link: string): void;
    _selectChange(args: any[]): void;
}
