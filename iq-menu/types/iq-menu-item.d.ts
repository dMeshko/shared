export interface IqMenuItem {
    /**
     * Determines if this will be rendered in the menu
     */
    show: boolean;
    
    /**
     * Page Title
     */
    pageTitle: string;

    /**
     * The path we want this route to be defined on
     */
    path: string;

    params: any[];
}
