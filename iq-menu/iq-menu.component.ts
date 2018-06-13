import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { IqMenuItem } from './types';
import { IqMenuTemplateDirective } from './iq-menu-template.directive';

@Component({
    selector: 'iq-menu',
    templateUrl: './iq-menu.component.html',
    styleUrls: ['./iq-menu.component.css']
})
export class IqMenuComponent implements OnInit {
    items: IqMenuItem[];

    @ContentChild(IqMenuTemplateDirective, { read: TemplateRef })
    template: TemplateRef<any>;
    templateContext: any;

    constructor(private router: Router) { }

    ngOnInit() {
        this.items = this.router.config
            .filter(route => route.data)
            .map(route => {
                const menuItem = route.data as IqMenuItem;
                menuItem.path = `/${route.path}`;

                return menuItem;
            })
            .filter(menuItem => menuItem.show);

        if (this.template) {
            this.templateContext = {
                items: this.items
            };
        }
    }
}
