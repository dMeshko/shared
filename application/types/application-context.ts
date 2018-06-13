import { ApplicationUser } from "./application-user";
import { ApplicationSite } from "./application-site";
import { IqLanguage } from "./iq-language";
import { ApplicationSettings } from "./application-settings";
import { SiteSettings } from "./site-settings";
import { IqModule } from "./iq-module";

export class ApplicationContext {
    siteKey: string;
    moduleType: string;
    currentUser: ApplicationUser;
    currentSite: ApplicationSite;
    systemTime: Date;
    currentLanguage: IqLanguage;
    activeModules: IqModule[];
    availableLanguages: IqLanguage[];
    applicationSettings: ApplicationSettings;
    siteSettings: SiteSettings;
    moduleSettings: any;
}
