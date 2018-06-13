export class AccountSelfProvisioning {
    constructor(public allowsAccountProvisioning: boolean,
        public defaultDepartmentId: string,
        public defaultFacilityId: string,
        public defaultPermissionProfileId: string,
        public allowedDomains: string,
        public allowedAllAuthenticatedUsers: boolean,
        public termsAndConditions: string) {

    }
}
