import { IqModuleFeatureType } from "./iq-module-feature-type.enum";

export class IqModule {
    constructor(public id: number,
        public name: string,
        public activeFeatures: IqModuleFeatureType[],
        public moduleRoles: string[]) {

    }
}
