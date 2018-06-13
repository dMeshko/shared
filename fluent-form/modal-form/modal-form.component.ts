import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FluentFormService } from "../fluent-form.service";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormConfig } from "./modal-form-config";
import { BaseAction, CustomAction } from "../actions/";

@Component({
    selector: 'modal-form',
    templateUrl: "./modal-form.component.html",
    styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit, AfterViewInit {
    @Input() config: ModalFormConfig;
    @ViewChild("modalContent") modalContent: ElementRef; // template variable

    form: FormGroup;

    private modalRef: NgbModalRef;

    constructor(private fluentFormService: FluentFormService, private modalService: NgbModal) { }

    ngOnInit() {
        this.form = this.fluentFormService.toFormGroup(this.config.controls, this.config.actions);
    }

    ngAfterViewInit() {
        // due to bug in angular, has to be initialized the good old way
        setTimeout(() => {
            this.modalRef = this.modalService.open(this.modalContent, { centered: true, backdrop: "static", size: "lg" });
            this.config.modalRef = this.modalRef;
        });
    }

    modalAction(action: BaseAction) {
        if (!this.modalRef)
            throw new Error("The modal references(modalRef) is not set!!");

        if (action.actionType === "submit") {
            this.config.submitted = true;

            if (this.form.invalid)
                return;
        }

        if (action instanceof CustomAction) {
            // just call the CB, dont attach any result listeners
            // get the modal ref though the ModalForm config object
            action.callback(this.form.value);
        } else {
            if (action.actionType === "submit")
                this.modalRef.close(this.form.value);
            else
                this.modalRef.dismiss(this.form.value);

            // attach the callbacks
            this.modalRef.result.then(
                (formValueSnapshot) => {
                    action.callback(formValueSnapshot);
                },
                (formValueSnapshot) => {
                    action.callback(formValueSnapshot);
                }
            );
        }
    }
}
