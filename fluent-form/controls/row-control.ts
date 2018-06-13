import { BaseControl } from "./base-control.abstract";

export class RowControl {
    controlType: string;
    controls: BaseControl<any>[];

    constructor(controls: BaseControl<any>[]) {
        this.controlType = "row";
        this.controls = controls;
    }
}
