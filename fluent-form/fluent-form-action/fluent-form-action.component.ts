import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseAction } from "../actions/base-action.abstract";
import { ModalFormConfig } from "../modal-form/modal-form-config";

@Component({
    selector: 'fluent-form-action',
    templateUrl: './fluent-form-action.component.html'
})
export class FluentFormActionComponent implements OnInit {
    @Input() action: BaseAction;
    @Input() form: FormGroup;
    @Input() config: ModalFormConfig;
    @Output() modalAction: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        // if its submit button, maintain it as the form changes
        if (this.action.actionType === "submit") {
            Object.keys(this.form.controls).forEach(controlKey => {
                const actionConfig = this.config.actions.filter(item => item.field === controlKey)[0];
                if (!actionConfig && controlKey !== this.action.field)
                    this.form.get(controlKey).valueChanges.subscribe(() => {
                        this.form.get(controlKey).updateValueAndValidity({ emitEvent: false });

                        // get all submit actions and disable them
                        this.config.actions.filter(item => item.actionType === "submit").forEach(item =>
                            this.form.get(item.field).reset({ value: item.value, disabled: this.config.submitted && this.form.invalid }));
                    });
            });
        }
    }

    triggerEvent() {
        if (this.action.actionType === "submit") {
            // get all submit actions and disable them
                        this.config.actions.filter(item => item.actionType === "submit").forEach(item =>
                            this.form.get(item.field).reset({ value: item.value, disabled: this.form.invalid }));
        }
        this.modalAction.emit(this.action);
    }
}
