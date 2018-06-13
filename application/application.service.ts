import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationContext, ApplicationUser, ApplicationSite, ApplicationSettings, IqLanguage, IqModule, SiteSettings } from './types';
import { HelpersService } from '../helpers/helpers.service';

@Injectable()
export class ApplicationService {
    private applicationContext: ApplicationContext;
    private readonly apiUrl: string;
    private readonly baseUrl: string;

    constructor(private http: HttpClient, private helpers: HelpersService) {
        const pathFragments = window.location.pathname.split("/");
        this.baseUrl = window.location.href.split("/").slice(0, -1).join("/");
        this.apiUrl = `${window.location.protocol}//${window.location.host}/${pathFragments[1]}/api/${pathFragments[2]}/${pathFragments[3]}`;
    }

    init(): Promise<any> {
        const pathFragments = window.location.pathname.split("/");
        const url = `${this.apiUrl}/ApplicationSettings/GetApplicationContext`;
        return this.http.post(url, { moduleKey: pathFragments[1] }).toPromise()
            .then((response: ApplicationContext) => {
            this.applicationContext = <ApplicationContext>this.helpers.toCamel(response);
        });
    }

    /**
     * Returns the sites base url
     */
    getBaseUrl(): string {
        return this.baseUrl;
    }

    getApiUrl(): string {
        return this.apiUrl;
    }

    /**
     * Returns the current site key
     */
    getCurrentSiteKey(): string {
        return this.applicationContext.siteKey;
    }

    /**
     * Returns the module type
     */
    getCurrentModuleType(): string {
        return this.applicationContext.moduleType;
    }

    /**
     * Returns lower-cased module type
     */
    getCurrentModuleKey(): string {
        return this.getCurrentModuleType().toLowerCase();
    }

    /**
     * Returns the current user
     */
    getCurrentUser(): ApplicationUser {
        return this.applicationContext.currentUser;
    }

    /**
     * Returns the current site
     */
    getCurrentSite(): ApplicationSite {
        return this.applicationContext.currentSite;
    }

    /**
     * Returns the system time, based on the time zone
     */
    getSystemTime(): Date {
        return this.applicationContext.systemTime;
    }

    /**
     * Returns the current language of the site
     */
    getCurrentLanguage(): IqLanguage {
        return this.applicationContext.currentLanguage;
    }

    /**
     * Returns the currently available modules
     */
    getActiveModules(): IqModule[] {
        return this.applicationContext.activeModules;
    }

    /**
     * Returns list of the available languages
     */
    getAvailableLanguages(): IqLanguage[] {
        return this.applicationContext.availableLanguages;
    }

    /**
     * Returns the current application settings
     * NOTE: Application settings are the same for all sites and all modules
     */
    getApplicationSettings(): ApplicationSettings {
        return this.applicationContext.applicationSettings;
    }

    /**
     * Returns the current site settings
     * NOTE: Site Settings are the same for all modules, BUT specific for site
     */
    getSiteSettings(): SiteSettings {
        return this.applicationContext.siteSettings;
    }

    /**
     * Returns the current module settings
     */
    getCurrentModuleSettings(): any {
        return this.applicationContext.moduleSettings;
    }

    /**
     * Checks whether the user has any of the provided roles
     * @param roles list of roles
     */
    hasAnyRole(roles: string[]): boolean {
        return false;
    }

    /**
     * Sets the current language for the current user
     * @param languageKey
     */
    setLanguage(languageKey: string): void {

    }
}
