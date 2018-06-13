export abstract class BaseControl<T> {
    label?: string;
    value?: T;
    field?: string;
    required?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    css?: string;
    controlType?: "input" | "select" | "textarea" | "component";

    constructor(options: BaseControl<T>) {
        this.label = options.label || "";
        this.value = options.value || undefined;
        this.field = options.field || `field${new Date().getUTCMilliseconds().toString()}`;
        this.required = options.required || false;
        this.autoFocus = options.autoFocus || false;
        this.disabled = options.disabled || false;
        this.css = options.css || "col-xs-12";
        this.controlType = options.controlType || "input";
    }
}
