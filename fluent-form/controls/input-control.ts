import { BaseControl } from "./base-control.abstract";
import { FormControl, Validators, ValidatorFn } from "@angular/forms";
import { IFormControl } from "../form-control.interface";

export class InputControl extends BaseControl<string | number | boolean> implements IFormControl {
    type: "button" | "checkbox" | "email" | "text" | "password" | "hidden" | "number" | "radio";
    placeholder: string;

    constructor(options: {
        type: "button" | "checkbox" | "email" | "text" | "password" | "hidden" | "number" | "radio",
        field: string,
        css?: string,
        label?: string,
        value?: string | number | boolean,
        placeholder?: string,
        required?: boolean,
        autoFocus?: boolean,
        disabled?: boolean
    }) {
        super({
            controlType: "input",
            field: options.field,
            label: options.label,
            css: options.css,
            value: options.value,
            required: options.required,
            autoFocus: options.autoFocus,
            disabled: options.disabled
        });

        this.type = options.type;
        this.placeholder = options.placeholder || "";
    }

    toFormControl(): FormControl {
        const validators: ValidatorFn[] = [];
        if (this.required)
            validators.push(Validators.required);
        if (this.type === "email")
            validators.push(Validators.email);

        return new FormControl(this.value || "", validators);
    }
}
