import { IFluentTableColumnConfig } from "./fluent-table-column-config.interface";
import { IFluentTableGroupingConfig } from "./fluent-table-grouping-config.interface";
import { IFluentTableSelectionConfig } from "./fluent-table-selection-config.interface";

export class FluentTableConfig {
    pageSize: number;
    rowClass: (row: { [key: string]: any }) => any;
    columns: IFluentTableColumnConfig[];
    grouping: IFluentTableGroupingConfig;
    sorting: { [key: string]: "asc" | "desc" } | { [key: string]: "asc" | "desc" }[];
    selection: IFluentTableSelectionConfig;

    constructor(options: {
        pageSize?: number,
        rowClass?: (row: { [key: string]: any }) => any,
        columns: IFluentTableColumnConfig[],
        grouping?: IFluentTableGroupingConfig,
        sorting?: { [key: string]: "asc" | "desc" } | { [key: string]: "asc" | "desc" }[],
        selection?: IFluentTableSelectionConfig
    }) {
        this.columns = options.columns;
        this.grouping = options.grouping;
        this.sorting = options.sorting;
        this.selection = options.selection;
        this.pageSize = options.pageSize;
        this.rowClass = options.rowClass;
    }
}
