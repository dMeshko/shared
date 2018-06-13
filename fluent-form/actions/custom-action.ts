import { FormControl } from "@angular/forms";
import { IFormControl } from "../form-control.interface";
import { BaseAction } from "./base-action.abstract";

export class CustomAction extends BaseAction implements IFormControl {
    constructor(options: {
        field: string,
        value: string,
        callback: Function,
        actionType: "submit" | "button",
        css?: string
    }) {
        super({
            field: options.field,
            value: options.value,
            callback: options.callback,
            css: options.css,
            actionType: options.actionType,
        });
    }

    toFormControl(): FormControl {
        return this.actionType === "submit" ?
            new FormControl({ value: this.value || "", disabled: false }) :
            new FormControl(this.value || "");
    }
}
