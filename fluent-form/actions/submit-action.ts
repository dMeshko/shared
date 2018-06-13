import { BaseAction } from "./base-action.abstract";
import { IFormControl } from "../form-control.interface";
import {FormControl} from "@angular/forms";

export class SubmitAction extends BaseAction implements IFormControl {
    constructor(options: {
        field: string,
        value: string,
        callback: Function,
        css?: string
    }) {
        super({
            field: options.field,
            value: options.value,
            callback: options.callback,
            actionType: "submit",
            css: options.css,
        });

        this.actionType = "submit";
    }

    toFormControl(): FormControl {
        return new FormControl({ value: this.value || "", disabled: false });
    }
}
