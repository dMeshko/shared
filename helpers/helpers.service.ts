import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {
    constructor() { }

    toCamel(o) {
        let newO;
        let origKey;
        let newKey;
        let value;
        if (o instanceof Array) {
            newO = [];
            for (origKey in o) {
                if (o.hasOwnProperty(origKey)) {
                    value = o[origKey];
                    if (typeof value === "object") {
                        value = this.toCamel(value);
                    }
                    newO.push(value);
                }
            }
        } else {
            newO = {};
            for (origKey in o) {
                if (o.hasOwnProperty(origKey)) {
                    newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString();
                    value = o[origKey];
                    if (value instanceof Array || value && value.constructor === Object) {
                        value = this.toCamel(value);
                    }
                    newO[newKey] = value;
                }
            }
        }
        return newO;
    }
}
