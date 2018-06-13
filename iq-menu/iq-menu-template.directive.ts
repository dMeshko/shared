import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[iqMenuTemplate]'
})
export class IqMenuTemplateDirective {
    constructor(public template: TemplateRef<any>) { }
}
