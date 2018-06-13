import { PersonnelStatus } from "./personnel-status.enum";

export class PersonnelSiteAccess {
    constructor(public status: PersonnelStatus,
        public defaultModuleType: number,
        public siteKey: string,
        public siteId: string,
        public departmentId: string,
        public siteName: string,
        public departmentName: string) {

    }
}
