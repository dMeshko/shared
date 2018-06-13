import { PersonnelModuleAccess } from "./personnel-module-access";
import { PersonnelFacilityAccess } from "./personnel-facility-access";
import { PersonnelSiteAccess } from "./personnel-site-access";
import { PersonnelType } from "./personnel-type.enum";

export class ApplicationUser {
    constructor(public defaultLanguageKey: string,
        public email: string,
        public fullName: string,
        public personnelId: string,
        public username: string,
        public pageSidebarClosed: boolean,
        public personnelType: PersonnelType,
        public moduleAccess: PersonnelModuleAccess[],
        public personnelFacilities: PersonnelFacilityAccess[],
        public siteAccess: PersonnelSiteAccess[]
        ) {

    }
}
