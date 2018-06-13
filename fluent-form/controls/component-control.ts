import { BaseControl } from "./base-control.abstract";
import { IFormControl } from "../form-control.interface";
import { FormControl } from "@angular/forms";

export class ComponentControl extends BaseControl<any> implements IFormControl {
    componentClass: any;
    data: { [ key: string ]: any }[];

    constructor(options: {
        componentClass: any,
        field: string,
        data?: { [key: string]: any }[],
        css?: string,
        label?: string,
        value?: string | number | boolean,
        placeholder?: string,
        required?: boolean,
        autoFocus?: boolean,
        disabled?: boolean
    }) {
        super({
            controlType: "component",
            field: options.field,
            label: options.label,
            css: options.css,
            value: options.value,
            required: options.required,
            autoFocus: options.autoFocus,
            disabled: options.disabled
        });

        this.componentClass = options.componentClass;
        this.data = options.data;
    }

    toFormControl(): FormControl {
        return new FormControl(this.value || "");
    }
}
