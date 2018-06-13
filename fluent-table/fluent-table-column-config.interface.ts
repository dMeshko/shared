export interface IFluentTableColumnConfig {
    field: string;
    title?: string;
    show?: boolean;
    sortable?: string;
    resizable?: boolean;
    cellClass?: string | (({ row, column, value }) => any);
    minWidth?: number;
    width?: number;
    maxWidth?: number;
    flexGrow?: number;
    type: "string" | "custom";
}
