import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseControl, RowControl, InputControl, ComponentControl } from './controls/';
import { BaseAction, SubmitAction, CancelAction, CustomAction } from './actions/';
import { IFormControl } from './form-control.interface';

@Injectable()
export class FluentFormService {
    private toFormControl(control: BaseControl<any>): FormControl {
        let component: IFormControl;

        if (control instanceof InputControl)
            component = control as InputControl;
        if (control instanceof ComponentControl)
            component = control as ComponentControl;

        return component ? component.toFormControl() : null;
    }

    private toFormAction(control: BaseAction): FormControl {
        let component: IFormControl;

        if (control instanceof SubmitAction)
            component = control as SubmitAction;
        if (control instanceof CancelAction)
            component = control as CancelAction;
        if (control instanceof CustomAction)
            component = control as CustomAction;

        return component ? component.toFormControl() : null;
    }

    toFormGroup(controls: (RowControl | BaseControl<any>)[], actions: BaseAction[]): FormGroup {
        if (!controls || !controls.length)
            return new FormGroup({});

        const group: any = {};
        let flatControls: BaseControl<any>[] = controls.filter(item => item instanceof BaseControl).map(item => <BaseControl<any>>item);
        controls.filter(item => item instanceof RowControl).forEach(
            item => flatControls = flatControls.concat((<RowControl>item).controls));
        flatControls.forEach(control => {
            group[control.field] = this.toFormControl(control);
        });

        actions.forEach(action => {
            group[action.field] = this.toFormAction(action);
        });

        return new FormGroup(group);
    }
}
