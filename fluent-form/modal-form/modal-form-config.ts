import { BaseControl, RowControl } from "../controls/";
import { BaseAction, SubmitAction, CancelAction } from "../actions/";
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

export class ModalFormConfig {
    modalRef: NgbModalRef;
    submitted: boolean;

    constructor(public modalHeader: string, public controls: (RowControl | BaseControl<any>)[], public actions: BaseAction[]) {
        this.submitted = false;
    }

    getSubmitActions(): BaseAction[] {
        return this.actions.filter(x => x instanceof SubmitAction);
    }

    getCancelActions(): BaseAction[] {
        return this.actions.filter(x => x instanceof CancelAction);
    }
}
