export abstract class BaseAction {
    field: string;
    value: string;
    callback: Function;
    actionType: "submit" | "button";
    css?: string;

    constructor(options: BaseAction) {
        this.field = options.field || `field${new Date().getUTCMilliseconds().toString()}`;
        this.value = options.value || "";
        this.callback = options.callback;
        this.actionType = options.actionType;
        this.css = options.css || "";
    }
}
