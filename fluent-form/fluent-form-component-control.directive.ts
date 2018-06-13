import { Directive, Input, ViewContainerRef, ComponentFactoryResolver, ComponentRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[fluentFormComponentControl]'
})
export class FluentFormComponentControlDirective implements OnInit {
    @Input() control;
    @Input() group: FormGroup;

    component: ComponentRef<any>;

    constructor(private container: ViewContainerRef, private resolver: ComponentFactoryResolver) { }

    ngOnInit(): void {
        if (this.control.componentClass) {
            const component = this.control.componentClass;
            const factory = this.resolver.resolveComponentFactory(component);
            this.component = this.container.createComponent(factory);
            this.control.data && this.control.data.forEach(attr => {
                var key = Object.keys(attr)[0];
                var val = attr[key];
                this.component.instance[key] = val;
            });

            this.component.instance['form'] = this.group;

        } else {
            throw new Error("property 'componentClass' is requred for ComponentControls!!");
        }
    }
}
