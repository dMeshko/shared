import { FluentTableRequestExportType } from "./fluent-table-request-export-type.enum"; 

export interface IFluentTableRequest {
    page: number;
    count: number;
    sorting: { name: string, dir: "asc" | "desc" }[];
    filter: { [key: string]: any }[];
    export?: boolean;
    exportType?: FluentTableRequestExportType
}
