import { TemplateRef } from "@angular/core";

export interface ZCOptions {
    title?: string,
    extra?: ZCExtra,
    bordered?: boolean,
    tabs?:ZCTabOptions,
}

export interface ZCExtra {
    buttons?: Array<ZCButtonOptions>,
    type?: 'button' | 'text',
}

export interface ZCTabOptions {
    size?: 'large' | 'small' | 'default',
    values: Array<ZCTabItemOptions>,
}

export interface ZCTabItemOptions {
    title:string,
    disabled?:boolean,
    component:TemplateRef<any>
}

export interface ZCButtonOptions {
    text: string,
    type?: 'primary' | 'default',
    link?: string ,
    danger?: boolean,
    diabled?: boolean,
    click?: any;
}