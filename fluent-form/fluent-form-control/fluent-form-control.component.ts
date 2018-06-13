import { Component, OnInit, Input } from '@angular/core';
import { BaseControl } from '../controls/';
import { ModalFormConfig } from "../modal-form/modal-form-config";
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'fluent-form-control',
    templateUrl: './fluent-form-control.component.html'
})
export class FluentFormControlComponent implements OnInit {
    @Input() control: BaseControl<any>;
    @Input() config: ModalFormConfig;
    @Input() form: FormGroup;

    get isValid() { return this.form.controls[this.control.field].valid; }
    get errors() {
        const errorObj = this.form.controls[this.control.field].errors;
        if (errorObj) {
            const errorKey = Object.keys(errorObj)[0];
            switch (errorKey) {
                case "required":
                    return "Please specify a value for this required field!";
                case "email":
                    return "Please enter valid email address!";
                default:
                    return "Validaton error!";
            }
        }

        return null;
    }

    constructor() { }

    ngOnInit() { }
}
