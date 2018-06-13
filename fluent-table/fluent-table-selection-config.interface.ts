import { TableColumn } from "@swimlane/ngx-datatable/src/types";

export interface IFluentTableSelectionConfig {
    /**
     * Row selection mode.
     * "single" = One row can be selected at a time
     * "cell" = One cell can be selected at a time
     * "multi" = Multiple rows can be selected using Ctrl or Shift key
     * "multiClick" = Multiple rows can be selected by clicking
     * "checkbox" = Multiple rows can be selected using checkboxes
     */
    mode: "none" | "single" | "cell" | "multi" | "multiClick" | "checkbox";
    /**
     * List of row objects that should be represented as selected in the grid.
     * Rows are compared using object equality.
     * For custom comparisons, use the selectCheck function.
     */
    selected?: any[];
    /**
     * A boolean or function you can use to check whether you want to enalbe checkbox optoin for a row based on criteria.
     */
    enableCheck?: (row: { [key: string]: any }, column: TableColumn, value: any) => boolean;
}
