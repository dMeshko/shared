import { BaseAction } from "./base-action.abstract";
import { IFormControl } from "../form-control.interface";
import {FormControl} from "@angular/forms";

export class CancelAction extends BaseAction implements IFormControl {
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
            actionType: "button",
            css: options.css,
        });

        this.actionType = "button";
    }

    toFormControl(): FormControl {
        return new FormControl(this.value || "");
    }
}
