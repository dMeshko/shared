import { AccountSelfProvisioning } from "./account-self-provisioning";
import { IqModulesOrder } from "./iq-modules-order";

export class SiteSettings {
    constructor(public contactEmail: string,
        public trainingRequestNotifiers: string,
        public feedbackNotifiers: string,
        public contactPhone: string,
        public enableEmail: boolean,
        public enablePersistentCookies: boolean,
        public permiteUserToEnablePersistentCookies: boolean,
        public permitUserToDisablePersistentCookies: boolean,
        public accountSelfProvisioning: AccountSelfProvisioning,
        public nonWorkingDaysInWeek: boolean[],
        public modulesOrder: IqModulesOrder[]) {

    }
}
