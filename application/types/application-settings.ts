export class ApplicationSettings {
    constructor(public version: string,
        public corporateTitle: string,
        public contactEmail: string,
        public contactPhone: string,
        public enableEmail: boolean,
        public membershipAuth: boolean,
        public windowsAuth: boolean,
        public office365Auth: boolean,
        public maxFileSize: number,
        public listViewPageSize: number,
        public maxExportRecordSize: number,
        public daysToKeepOldSentEmailMessages: number) {

    }
}
