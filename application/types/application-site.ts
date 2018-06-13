import { IqModule } from "./iq-module";

export class ApplicationSite {
    constructor(public cultureInfo: string,
        public siteName: string,
        public siteKey: string,
        public isMultiSite: boolean,
        public siteGroupName: string,
        public siteUrl: string,
        public spWebId: string,
        public timeZone: any,
        public activeModules: IqModule[]) {

    }
}
